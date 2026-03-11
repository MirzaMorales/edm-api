
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UtilService } from 'src/common/services/utiles.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.e,
      signOptions: { expiresIn: '60s' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, UtilService, PrismaService],
})
export class AuthModule {

}