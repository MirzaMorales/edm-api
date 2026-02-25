import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTaskDto {

    @IsOptional()
    @IsString({message: "El nombre debe ser un string"})
    @MinLength(3, {message: "El nombre debe tener al menos 3 caracteres"})
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsString({message: "El nombre debe ser un string"})
    @MinLength(3, {message: "El nombre debe tener al menos 3 caracteres"})
    @MaxLength(250)
    description?: string;

    @IsOptional()
    @IsBoolean()
    priority?: boolean;
}
