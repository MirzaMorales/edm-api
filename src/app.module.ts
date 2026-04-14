import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/interfaces/task.module';
import { UserModule } from './modules/users/interfaces/user.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaService } from './common/services/prisma.service';

// Encargado de controlar a controladores y los servicios
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
