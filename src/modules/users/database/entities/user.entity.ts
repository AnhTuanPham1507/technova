import { AbstractEntity } from "@common/abstract.entity";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { OrderEntity } from "@modules/orders/database/entities/order.entity";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";


@Entity({name: 'user'})
export class UserEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 50
    })
    name: string;

    @Column({
        name: 'email',
        length: 50
    })
    @IsEmail({}, { message: 'Incorrect format email' })
    email: string;

    @Column({
        name: 'phone',
        length: 15
    })
    @IsPhoneNumber('VI')
    phone: string;

    @OneToOne(
        () => AccountEntity,
        (account) => account.user
    )
    @JoinColumn({name: 'account_id'})
    account: AccountEntity;

    @OneToMany(
        () => OrderEntity,
        (order) => order.user
    )
    orders: OrderEntity[];
}