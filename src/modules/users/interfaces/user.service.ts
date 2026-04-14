import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/utiles.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private utilService: UtilService,
  ) {}

  public async getUsers(id: number): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: false,
        hash: false,
        create_at: true,
      },
      where: {
        id: {
          not: id,
        },
      },
    });
    return users;
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: false,
        hash: false,
        create_at: true,
      },
    });
    return user as User | null;
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: false,
        create_at: true,
      },
    });
    return user as User | null;
  }

  public async insertUser(user: CreateUserDTO): Promise<any> {
    const hashedPassword = await this.utilService.hash(user.password);

    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  public async updateUser(
    id: number,
    userUpdated: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: userUpdated,
    });
    return user;
  }

  public async deleteUser(id: number): Promise<User> {
    // Solo bloqueamos si existen tareas pendientes
    const pendingTaskCount = await this.prisma.task.count({
      where: {
        user_Id: id,
        completed: false,
      },
    });

    if (pendingTaskCount > 0) {
      throw new HttpException(
        'No es posible eliminar tu cuenta hasta que hayas completado todas tus tareas',
        HttpStatus.CONFLICT,
      );
    }

    // Si todas las tareas están completadas, se eliminan primero
    await this.prisma.task.deleteMany({
      where: {
        user_Id: id,
      },
    });

    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user as User;
  }
}
