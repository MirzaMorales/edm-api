import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { User } from "src/modules/users/entities/user.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Usuarios")
@Controller("/api/users")
export class UserController {

    constructor(private readonly userSvc: UserService) { }

    @Get("/get-users")
    public async getUsers(): Promise<any[]> {
        return await this.userSvc.getUsers();
    }

    @Get(":id")
    public async getUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
        const user = await this.userSvc.getUserById(id);

        if (user)
            return user;
        else throw new HttpException(`Usuario no encontrado`, 404);
    }

    @Post("/insert-user")
    public async insertUser(@Body() user: CreateUserDTO): Promise<any> {
        return await this.userSvc.insertUser(user);
    }

    @Put(":id")
    public async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<any> {
        return await this.userSvc.updateUser(id, user);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    public async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
        try {
            await this.userSvc.deleteUser(id);
            return true;
        } catch (error) {
            throw new HttpException(`Usuario no encontrado`, HttpStatus.NOT_FOUND);
        }
    }
}
