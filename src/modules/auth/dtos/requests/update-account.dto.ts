import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Min } from "class-validator";


export class UpdateAccountDTO {
    @ApiProperty({
        name: 'email',
        example: 'abc@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        name: 'currentPassword',
        example: '123455Aa'
    })
    @IsString()
    currentPassword: string;

    @ApiProperty({
        name: 'newPassword',
        example: '123455Aa'
    })
    @IsString()
    newPassword: string;
}