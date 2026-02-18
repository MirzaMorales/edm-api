import { IsNotEmpty, IsString, IsBoolean, MinLength, MaxLength, IsNumber, IsInt } from "class-validator";

export class CreateTaskDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    priority: boolean;

    @IsNumber()
    @IsInt()
    user_id: number;
}