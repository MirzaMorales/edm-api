import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "src/modules/auth/dto/create-task.dto";
import { UpdateTaskDto } from "src/modules/auth/dto/update.task.dto";
import { Task } from "src/modules/auth/entities/task.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Tareas")
@Controller("/api/task")
export class TaskController {

    constructor( private readonly taskSvc: TaskService){}

    @Get("/get-tasks")
    @ApiOperation({summary: "Lista las tareas disponibles"})
    public async getTasks(): Promise<any[]> {
        return await this.taskSvc.getTasks();
    }

    @Get(":id")
    public async getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task>{   
        var task = await this.taskSvc.getTaskById(id);

        if(task)
            return task;
        else throw new HttpException(`Task Not Found`, 404);
    }

    @Post("/insert-task")
    public async insertTask(@Body() task: CreateTaskDTO): Promise<any>{
        return await this.taskSvc.insertTask(task);
    }

    @Put(":id")
    public async updateTask(@Param("id", ParseIntPipe) id: number, @Body()task: UpdateTaskDto): Promise<any>{      
        return await this.taskSvc.updateTask(id, task);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    public async deleteTask(@Param("id", ParseIntPipe) id: number): Promise<boolean>{
        
        const result = await this.taskSvc.deleteTask(id);

        if(!result)
        throw new HttpException(`No se puede eliminar la tarea`, 404);
    
        return result;
    }
}