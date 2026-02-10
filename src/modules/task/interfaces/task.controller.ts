import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";

@Controller("/api/task")
export class TaskController {

    constructor( private readonly taskSvc: TaskService){}

    @Get("/get-tasks")
    public getTasks(): string{
        return this.taskSvc.getTasks();
    }

    @Get(":id")
    public getTaskById(@Param("id") id: string): any{   
        return this.taskSvc.getTaskById(parseInt(id));
    }

    @Post("/insert-task")
    public insertTask(task: any): any{
        return this.taskSvc.insertTask(task);
    }

    @Put(":id")
    public updateTask(id: number, task: any): any{      
        return this.taskSvc.updateTask(id, task);
    }

    @Delete(":id")
    public deleteTask(id: number): string{
        return this.taskSvc.deleteTask(id);
    }
}