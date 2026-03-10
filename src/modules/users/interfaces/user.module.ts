import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseProvider } from 'src/common/providers/database.provider';
import { PrismaService } from 'src/common/services/prisma.service';


@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    databaseProvider[0],
    UserService
  ]
})

export class UserModule {
    
}
