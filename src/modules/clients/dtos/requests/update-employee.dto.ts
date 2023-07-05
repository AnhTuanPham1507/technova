import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateEmployeeDTO {

    @ApiProperty({
        name: 'name',
        example: 'Anh Tuấn'
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: 'password',
        example: 'password'
    })
    @IsString()
    // @Min(8)
    // @Max(50)
    @IsOptional()
    password: string;

    @IsString()
    // @Min(8)
    // @Max(50)
    @IsOptional()
    email: string;

}