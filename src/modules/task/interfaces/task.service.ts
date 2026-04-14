import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { CreateTaskDTO } from 'src/modules/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/task/dto/update.task.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // Listar solo tareas del usuario autenticado
  public async getTasks(id: number): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        user_Id: id,
      },
    });
  }

  // Buscar por ID de tarea Y ID de usuario (evita acceso entre usuarios)
  public async getTaskById(id: number, user_Id: number): Promise<Task | null> {
    return await this.prisma.task.findFirst({
      where: {
        id: id,
        user_Id: user_Id,
      },
    });
  }

  // Insertar usando el ID del usuario extraído del JWT
  public async insertTask(task: CreateTaskDTO): Promise<Task> {
    return await this.prisma.task.create({
      data: {
        name: task.name,
        description: task.description,
        priority: task.priority,
        // Usamos 'connect' para asegurar la relación con el usuario propietario
        user: {
          connect: { id: task.user_Id },
        },
      },
    });
  }

  public async updateTask(
    id: number,
    user_Id: number,
    taskUpdated: UpdateTaskDto,
  ): Promise<Task | null> {
    const updateResult = await this.prisma.task.updateMany({
      where: {
        id: id,
        user_Id: user_Id,
      },
      data: taskUpdated,
    });
    if (updateResult.count === 0) {
      throw new HttpException('Tarea no encontrada o no tienes permisos', 403);
    }
    return await this.prisma.task.findUnique({ where: { id } });
  }

  public async deleteTask(id: number, user_Id: number): Promise<void> {
    const result = await this.prisma.task.deleteMany({
      where: {
        id: id,
        user_Id: user_Id, // Solo borrará si AMBOS coinciden (seguridad de acceso)
      },
    });

    // Si no se borró nada, la tarea no existe o no pertenece al usuario
    if (result.count === 0) {
      throw new HttpException(
        'No se pudo eliminar la tarea: no existe o no tienes permisos',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
