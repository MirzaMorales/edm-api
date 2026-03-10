import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { CreateUserDTO } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { User } from "src/modules/users/entities/user.entity";
import { PrismaService } from "src/common/services/prisma.service";

@Injectable()
export class UserService {

    constructor(
        @Inject('DATABASE_CONNECTION') private db: Client,
        private prisma: PrismaService
    ) { }

    public async getUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            orderBy: {
                name: 'asc'
            },
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                create_at: true,
            }
        });
        return users;
    }

    public async getUserById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                create_at: true,
            }
        });
        return user as User | null;
    }

    public async getUserByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                create_at: true,
            }
        });
        return user as User | null;
    }

    public async insertUser(user: CreateUserDTO): Promise<any> {
        const newUser = await this.prisma.user.create({
            data: user
        });
        return newUser;
    }

    public async updateUser(id: number, userUpdated: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: userUpdated,
        });
        return user;
    }

    public async deleteUser(id: number): Promise<User> {
        const user = await this.prisma.user.delete({
            where: {
                id: id
            }
        });
        return user as User;
    }
}
