import { AbstractEntity } from "@common/abstract.entity";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { NotificationEntity } from "@modules/notification/database/entities/notification.entity";
import { OrderEntity } from "@modules/orders/database/entities/order.entity";
import { Transform } from "class-transformer";
import { IsPhoneNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";


@Entity({name: 'user'})
export class UserEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 50
    })
    name: string;

    @Column({
        name: 'phone',
        length: 15
    })
    @Transform((v) => "+84" + v.value )
    @IsPhoneNumber('VI')
    phone: string;

    @Column({
        name: 'address',
        length: 150,
        nullable: true
    })
    @IsString() 
    address: string;

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


    constructor(name: string, phone: string, address: string, account: AccountEntity){
        super();
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.account = account;
    }
}