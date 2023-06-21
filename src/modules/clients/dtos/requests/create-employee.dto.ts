import { CreateAccountDTO } from "@modules/auth/dtos/requests/create-account.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateEmployeeDTO extends CreateAccountDTO{

    @ApiProperty({
        name: 'name',
        example: 'Anh Tuấn'
    })
    @IsString()
    name: string;

}