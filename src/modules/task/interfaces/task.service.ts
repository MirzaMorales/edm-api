import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { CreateTaskDTO } from "src/modules/task/dto/create-task.dto";
import { UpdateTaskDto } from "src/modules/task/dto/update.task.dto";
import { Task } from "src/modules/auth/entities/task.entity";
import { PrismaService } from "src/common/services/prisma.service";
import { HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    // Listar solo tareas del usuario
    public async getTasks(userId: number): Promise<Task[]> {
        return await this.prisma.task.findMany({
            where: { user_Id: userId }
        });
    }

    // Buscar por ID de tarea Y ID de usuario
    public async getTaskById(id: number, userId: number): Promise<Task | null> {
        return await this.prisma.task.findFirst({
            where: { 
                id: id,
                user_Id: userId 
            }
        });
    }

    // Insertar usando el ID del JWT
    public async insertTask(task: CreateTaskDTO): Promise<any> {
        return await this.prisma.task.create({
            data: task // task ya trae el user_Id desde el controller
        });
    }

    // Actualizar solo si le pertenece
    public async updateTask(id: number, userId: number, taskUpdated: UpdateTaskDto): Promise<Task> {
        // Usamos updateMany o primero buscamos para asegurar que el usuario es dueño
        const task = await this.prisma.task.findFirst({ where: { id, user_Id: userId } });
        if (!task) throw new HttpException("No tienes permiso o la tarea no existe", 403);

        return await this.prisma.task.update({
            where: { id: id },
            data: taskUpdated
        });
    }

    // Eliminar solo si le pertenece
    public async deleteTask(id: number, userId: number): Promise<Task> {
        // Intentar borrar con doble condición de seguridad
        try {
            // Nota: delete de Prisma requiere un ID único, así que validamos antes
            const task = await this.getTaskById(id, userId);
            if(!task) throw new Error();

            return await this.prisma.task.delete({
                where: { id: id }
            });
        } catch (e) {
            throw new HttpException(`No se pudo eliminar la tarea`, HttpStatus.FORBIDDEN);
        }
    }
}