import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { RoleEntity } from "./role.entity";


@Entity({name: 'permission'})
export class PermissionEntity extends AbstractEntity {
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

    @ManyToMany(
        () => RoleEntity,
        (role) => role.permissions,
    )
    @JoinTable()
    role: RoleEntity[];
}