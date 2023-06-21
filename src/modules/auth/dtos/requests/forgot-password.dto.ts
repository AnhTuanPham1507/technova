import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ForgotPasswordDTO {

    @ApiProperty({
        name: 'email'
    })
    @IsEmail()
    email: string;
}