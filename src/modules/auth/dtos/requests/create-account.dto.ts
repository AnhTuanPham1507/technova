
import { IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "@constants/enums/role.enum";

export class CreateAccountDTO{
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