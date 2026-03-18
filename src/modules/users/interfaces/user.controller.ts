import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { User } from "src/modules/users/entities/user.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Usuarios")
@UseGuards(AuthGuard)
@Controller("/api/user")
export class UserController {

    constructor(private readonly userSvc: UserService) { }

    @Get()
    @ApiOperation({ summary: "Obtiene una lista de todos los usuarios" })
    public async getUsers(@Req() request: any): Promise<any[]> {
        var {id} = request['user'];
        
        return await this.userSvc.getUsers(id);
    }

    @Get(":id")
    public async getUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
        const user = await this.userSvc.getUserById(id);

        if (user)
            return user;
        else throw new HttpException(`Usuario no encontrado`, 404);
    }

    @Get("/get-user-by-username/:username")
    public async getUserByUsername(@Param("username") username: string): Promise<User | null> {
        const user = await this.userSvc.getUserByUsername(username);

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


