import { IsNotEmpty, IsString, IsBoolean, Min, Max } from "class-validator";

export class CreateTaskDTO {

    @IsString()
    @IsNotEmpty()
    @Min(3)
    @Max(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Min(3)
    @Max(500)
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    priority: boolean;
}