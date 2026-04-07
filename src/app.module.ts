import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/interfaces/task.module';
import { UserModule } from './modules/users/interfaces/user.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaService } from './common/services/prisma.service';

// Encargado de controlar a controladores y los servicios
@Module({
  imports: [
    AuthModule,
    UserModule,
    TaskModule
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
