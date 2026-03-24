import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards,  } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";
import { ApiOperation } from "@nestjs/swagger";
import { JwtService } from "@nestjs/jwt";
import { UtilService } from "src/common/services/utiles.service";
import { AuthGuard } from "src/common/guards/auth.guard";


@Controller("/api/auth")
export class AuthController{

    constructor(
        private readonly authSvc: AuthService,
        private readonly util: UtilService
    ){}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Verifica las credenciales y crea un JWT" })
    public async login(@Body()auth: AuthDTO): Promise<any>{
        const { username, password } = auth;

        // Verificar usuario y constraseña
        const user = await this.authSvc.getUserByUserName(username);
        if(!user) 
            throw new UnauthorizedException(`Usuario y/o contraseña es  incorrecto`);

        if(await this.util.checkPassword(password, user.password!)){
            //obtener informacion de payload
            const {password, ...payload} = user;

            //generar token de acceso 60s
            const jwt = await this.util.generateJWT(payload);

            //generar refres token por 7d
            const refresh = await this.util.generateJWT(payload, '7d');

            return { access_token: jwt, refresh_token: refresh };

        } else {
            throw new UnauthorizedException(`Usuario y/o contraseña es  incorrecto`);
        }
    }

    @Get("me")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "obtiene el id del usuario y devuelve un JWT" })
    public getPorfile(@Req() request: any){
        const user_Id = request['user'];
        return user_Id
    }

    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Refresca el token JWT" })
    public refreshToken() {

    }

    @Post("logout")
    @HttpCode(204)
    @ApiOperation({ summary: "Cierra la sesión del usuario.Invalida los tokens en el lado del servidor y limpia las cookies" })
    public logout() {

    }


}