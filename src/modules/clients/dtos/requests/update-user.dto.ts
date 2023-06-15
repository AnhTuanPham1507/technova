import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Min } from "class-validator";

export class UpdateUserDTO {

    @ApiProperty({
        name: 'name',
        example: 'Anh Tuấn'
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: 'phone',
        example: '0779982210'
    })
    @IsPhoneNumber('VI')
    @IsOptional()
    phone: string;

    @ApiProperty({
        name: 'email',
        example: 'abc@gmail.com'
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        name: 'address',
        example: '250 LHP TP Hồ chí Minh'
    })
    @IsString()
    @IsOptional()
    address: string;

}