import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import {EmployeeEntity} from "../../database/entities/employee.entity";

export class EmployeeDTO extends AbstractDTO {
    @ApiProperty({
        name: 'name',
        example: 'Anh Tuấn'
    })
    name: string;

    @ApiProperty({
        name: 'email',
        example: 'abc@gmail.com'
    })
    email: string;

    constructor(employee: EmployeeEntity, email: string){
        super(employee);
        this.name = employee.name;
        this.email = email;
    }
}