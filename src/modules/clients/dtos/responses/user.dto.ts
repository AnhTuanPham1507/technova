import { AbstractDTO } from "@common/dtos/abstract.dto";
import { UserEntity } from "@modules/clients/database/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO extends AbstractDTO {

    @ApiProperty({
        name: 'name',
        example: 'Anh Tuấn'
    })
    name: string;

    @ApiProperty({
        name: 'phone',
        example: '0779982210'
    })
    phone: string;

    @ApiProperty({
        name: 'address',
        example: '250 LHP TP Hồ chí Minh'
    })
    address: string;

    constructor(user: UserEntity){
        super(user);
        this.name = user.name;
        this.phone = user.phone;
        this.address = user.address;
    }

}