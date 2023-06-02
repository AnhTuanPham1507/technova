import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { AccountEntity } from "./account.entity";
import { PermissionEntity } from "./permission.entity";


@Entity({name: 'role'})
export class RoleEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 20
    })
    name: string;

    @Column({
        name: 'description',
        type: 'text'
    })
    description: string;

    @OneToMany(
        () => AccountEntity,
        (account) => account.role 
    )
    accounts: AccountEntity[];

    @ManyToMany(
        () => PermissionEntity,
        (permission) => permission.role
    )
    permissions: PermissionEntity[];
}