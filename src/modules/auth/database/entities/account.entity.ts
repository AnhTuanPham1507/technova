

import { AbstractEntity } from "@common/abstract.entity";
import { RoleEnum } from "@constants/enums/role.enum";
import { CreateAccountDTO } from "@modules/auth/dtos/requests/create-account.dto";
import { AdminEntity } from "@modules/clients/database/entities/admin.entity";
import { EmployeeEntity } from "@modules/clients/database/entities/employee.entity";
import { UserEntity } from "@modules/clients/database/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity({name: 'account'})
export class AccountEntity extends AbstractEntity {
    @Column({
        name: 'email',
        length: 50,
        unique: true
    })
    email: string;

    @Column({
        name: 'password',
    })
    password: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: RoleEnum
    })
    role: RoleEnum;

    @OneToOne(
        () => UserEntity,
        (user) => user.account
    )
    user: UserEntity;

    @OneToOne(
        () => AdminEntity,
        (admin) => admin.account
    )
    admin: AdminEntity;

    @OneToOne(
        () => EmployeeEntity,
        (employee) => employee.account
    )
    employee: AdminEntity;

    constructor(email: string, password: string, role: RoleEnum){
        super();
        this.email = email;
        this.password = password;
        this.role = role;
    }
}