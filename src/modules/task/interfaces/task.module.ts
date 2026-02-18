import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { databaseProvider } from 'src/common/providers/database.provider';


@Module({
  controllers: [TaskController],
  providers: [
    databaseProvider[0],
    TaskService
  ],
})

export class TaskModule {
    
}