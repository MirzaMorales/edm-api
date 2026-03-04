import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { CreateTaskDTO } from "src/modules/auth/dto/create-task.dto";
import { UpdateTaskDto } from "src/modules/auth/dto/update.task.dto";
import { Task } from "src/modules/auth/entities/task.entity";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TaskService {

    constructor(
        @Inject('DATABASE_CONNECTION') private db: Client,
        private prisma: PrismaService
    ) { }

    private tasks: any[] = [];

    public async getTasks(): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany();
        return tasks;
    }

    public async getTaskById(id: number): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: {
                id: id
            }
        });
        return task;
    }

    public async insertTask(task: CreateTaskDTO): Promise<any>{
        const newtask = await this.prisma.task.create({
            data: task
        });
        return newtask;
    }

    public async updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<Task>{
        console.log(taskUpdated);
        const task = await this.prisma.task.update({
            where: {
                id: id
            },
            data: taskUpdated
        });
        return task;
    }

    public async deleteTask(id: number): Promise<Task>{
        const task = await this.prisma.task.delete({
            where: {
                id: id
            }
        });
        return task;
    }


}