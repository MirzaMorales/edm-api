import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "src/modules/auth/dto/create-task.dto";

@Controller("/api/task")
export class TaskController {

    constructor( private readonly taskSvc: TaskService){}

    @Get("/get-tasks")
    public async getTasks(): Promise<any[]> {
        return await this.taskSvc.getTasks();
    }

    @Get(":id")
    public async getTaskById(@Param("id", ParseIntPipe) id: number): Promise<any>{   
        var task = await this.taskSvc.getTaskById(id);

        if(task && task.length > 0) return task;
        else throw new HttpException(`Task Not Found`, 404);
    }

    @Post("/insert-task")
    public async insertTask(@Body() task: CreateTaskDTO): Promise<any>{
        return await this.taskSvc.insertTask(task);
    }

    @Put(":id")
    public async updateTask(@Param("id", ParseIntPipe) id: number, @Body()task: any): Promise<any>{      
        return await this.taskSvc.updateTask(id, task);
    }

    @Delete(":id")
    public deleteTask(@Param("id", ParseIntPipe) id: number): string{
        return this.taskSvc.deleteTask(id);
    }
}