import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber } from "class-validator";


export class OrderPageOptionsDTO extends PageOptionsDTO {

    @ApiProperty({
        name: 'email',
        example: 'abc@gmail.com'
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        name: 'phone',
        example: 'phone'
    })
    @IsPhoneNumber('VI')
    @IsOptional()
    phone: string;
}