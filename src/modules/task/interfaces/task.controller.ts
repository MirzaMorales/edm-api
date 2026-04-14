import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from 'src/modules/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/task/dto/update.task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('Tareas')
@UseGuards(AuthGuard)
@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}

  @Get('/get-tasks')
  public async getTasks(@Req() request: any) {
    const user = await request['user'];
    return await this.taskSvc.getTasks(user.id);
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: any,
  ) {
    const user = await request['user'];
    const task = await this.taskSvc.getTaskById(id, user.id);
    if (!task) throw new HttpException(`Task Not Found or Access Denied`, 404);
    return task;
  }

  @Post('/insert-task')
  public async insertTask(@Body() task: CreateTaskDTO, @Req() request: any) {
    const user = await request['user'];

    if (!user || !user.id) {
      throw new UnauthorizedException(
        'No se pudo obtener el ID del usuario del token',
      );
    }

    task.user_Id = user.id;
    return await this.taskSvc.insertTask(task);
  }

  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
    @Req() request: any,
  ) {
    const user = await request['user'];
    if (!user || !user.id) throw new UnauthorizedException();
    return await this.taskSvc.updateTask(id, user.id, task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: any,
  ) {
    const user = await request['user'];
    await this.taskSvc.deleteTask(id, user.id);
    return { message: 'Tarea eliminada correctamente', status: true };
  }
}
