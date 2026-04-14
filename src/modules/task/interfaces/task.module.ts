import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { databaseProvider } from 'src/common/providers/database.provider';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/utiles.service';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, databaseProvider[0], TaskService, UtilService],
})
export class TaskModule {}
