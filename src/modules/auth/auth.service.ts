import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserByUserName(username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  public async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  public async updateHash(user_Id: number, hash: string | null): Promise<User> {
    return await this.prisma.user.update({
      where: { id: user_Id },
      data: { hash },
    });
  }

  public logIn(): string {
    return 'Login exitoso';
  }
}
