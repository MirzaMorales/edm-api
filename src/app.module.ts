import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/interfaces/task.module';

// Encargado de controlar a controladores y los servicios
@Module({
  imports: [
    AuthModule,
    TaskModule
  ]
})
export class AppModule {}
