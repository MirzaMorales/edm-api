import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseProvider } from 'src/common/providers/database.provider';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/utiles.service';


@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    databaseProvider[0],
    UserService,
    UtilService
  ]
})

export class UserModule {
    
}
