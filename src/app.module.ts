import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/interfaces/task.module';
import { UserModule } from './modules/users/interfaces/user.module';

// Encargado de controlar a controladores y los servicios
@Module({
  imports: [
    AuthModule,
    UserModule,
    TaskModule
  ]
})
export class AppModule {}
