import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDTO {
    @ApiProperty({
        name: 'email',
        example: 'email',
    })
    @IsString()
    // @Min(8)
    // @Max(50)
    email: string;

    @ApiProperty({
        name: 'password',
        example: 'password'
    })
    @IsString()
    // @Min(8)
    // @Max(50)
    password: string;
}