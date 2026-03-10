import { Body, Controller, Get, HttpCode, HttpStatus, Post,  } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";
import { ApiOperation } from "@nestjs/swagger";
import { JwtService } from "@nestjs/jwt";


@Controller("/api/auth")
export class AuthController{

    constructor(
        private readonly authSvc: AuthService,
        private jwtS: JwtService
    ){}

    @Get("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Verifica las credenciales y crea un JWT" })
    public async login(@Body()auth: AuthDTO): Promise<string>{
        const { username, password } = auth;

        const jwt = await this.jwtS.signAsync(auth)

        // Verificar usuario y constraseña

        //obtener informacion

        //generar token de acceso 60s

        //generar refres token por 7d
        return jwt
    }

    @Get("register")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "obtiene el id del usuario y devuelve un JWT" })
    public getPorfile() {

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