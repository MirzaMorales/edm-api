import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "src/modules/auth/dto/create-task.dto";

@Controller("/api/task")
export class TaskController {

    constructor( private readonly taskSvc: TaskService){}

    @Get("/get-tasks")
    public getTasks(): any[] {
        return this.taskSvc.getTasks();
    }

    @Get(":id")
    public getTaskById(@Param("id", ParseIntPipe) id: number): any{   
        var task = this.taskSvc.getTaskById(id);

        if(task) 
            return task;
        else 
            throw new HttpException(`Tarea con id: ${id} no encontrada`, 404);
    }

    @Post("/insert-task")
    public insertTask(@Body() task: CreateTaskDTO): any{
        return this.taskSvc.insertTask(task);
    }

    @Put(":id")
    public updateTask(@Param("id", ParseIntPipe) id: number, @Body()task: any): any{      
        return this.taskSvc.updateTask(id, task);
    }

    @Delete(":id")
    public deleteTask(@Param("id", ParseIntPipe) id: number): string{
        return this.taskSvc.deleteTask(id);
    }
}