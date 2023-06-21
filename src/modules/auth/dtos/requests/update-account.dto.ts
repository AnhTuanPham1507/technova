import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min } from "class-validator";


export class UpdateAccountDTO {
    @ApiProperty({
        name: 'password',
        example: '123455Aa'
    })
    @IsString()
    @Min(8)
    password: string;
}