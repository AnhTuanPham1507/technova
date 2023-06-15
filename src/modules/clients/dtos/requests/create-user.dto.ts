import { CreateAccountDTO } from "@modules/auth/dtos/requests/create-account.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Min } from "class-validator";

export class CreateUserDTO extends CreateAccountDTO{

    @ApiProperty({
        name: 'name',
        example: 'Anh Tuấn'
    })
    @IsString()
    name: string;

    @ApiProperty({
        name: 'phone',
        example: '0779982210'
    })
    @IsPhoneNumber('VI')
    phone: string;

    @ApiProperty({
        name: 'address',
        example: '250 LHP TP Hồ chí Minh'
    })
    @IsString()
    @IsOptional()
    address: string;
}