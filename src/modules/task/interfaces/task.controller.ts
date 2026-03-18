import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "src/modules/task/dto/create-task.dto";
import { UpdateTaskDto } from "src/modules/task/dto/update.task.dto";
import { Task } from "src/modules/auth/entities/task.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Tareas")
@UseGuards(AuthGuard)
@Controller("/api/task")
export class TaskController {
    constructor(private readonly taskSvc: TaskService) { }

    @Get("/get-tasks")
    public async getTasks(@Req() request: any) {
        const userId = request.user.id; // Extraemos el ID del JWT
        return await this.taskSvc.getTasks(userId);
    }

    @Get(":id")
    public async getTaskById(@Param("id", ParseIntPipe) id: number, @Req() request: any) {
        const userId = request.user.id;
        const task = await this.taskSvc.getTaskById(id, userId);

        if (!task) throw new HttpException(`Task Not Found or Access Denied`, 404);
        return task;
    }

    @Post("/insert-task")
    public async insertTask(@Body() task: CreateTaskDTO, @Req() request: any) {
        const userId = request.user.id;
        // Sobrescribimos el user_Id del DTO con el del token por seguridad
        return await this.taskSvc.insertTask({ ...task, user_Id: userId });
    }

    @Put(":id")
    public async updateTask(
        @Param("id", ParseIntPipe) id: number, 
        @Body() task: UpdateTaskDto, 
        @Req() request: any
    ) {
        const userId = request.user.id;
        return await this.taskSvc.updateTask(id, userId, task);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    public async deleteTask(@Param("id", ParseIntPipe) id: number, @Req() request: any) {
        const userId = request.user.id;
        await this.taskSvc.deleteTask(id, userId);
        return true;
    }
}