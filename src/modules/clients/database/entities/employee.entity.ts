import { AbstractEntity } from "@common/abstract.entity";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { OrderEntity } from "@modules/orders/database/entities/order.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";


@Entity({name: 'employee'})
export class EmployeeEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 50
    })
    name: string;

    @OneToOne(
        () => AccountEntity,
        (account) => account.employee
    )
    @JoinColumn({name: 'account_id'})
    account: AccountEntity;

    @OneToMany(
        () => OrderEntity,
        (order) => order.employee
    )
    orders: OrderEntity[];
}