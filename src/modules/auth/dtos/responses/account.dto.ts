import { AbstractDTO } from "@common/dtos/abstract.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { ApiProperty } from "@nestjs/swagger";

export class AccountDTO extends AbstractDTO {
    @ApiProperty({
        name: 'role',
        type: 'enum',
        enum: RoleEnum,
        example: RoleEnum.ADMIN
    })
    role: string;


    @ApiProperty()
    email: string

    constructor(account: AccountEntity){
        super(account);
        this.role = account.role;
        this.email = account.email;
    }
}