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

}