import { AbstractEntity } from "@common/abstract.entity";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { IsEmail } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";


@Entity({name: 'admin'})
export class AdminEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 50
    })
    name: string;


    @OneToOne(
        () => AccountEntity,
        (account) => account.admin
    )
    @JoinColumn({name: 'account_id'})
    account: AccountEntity;
}