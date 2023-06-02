import { AbstractEntity } from "@common/abstract.entity";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { EmployeeEntity } from "@modules/users/database/entities/employee.entity";
import { UserEntity } from "@modules/users/database/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { OrderDetailEntity } from "./order-detail.entity";
import { PaymentEntity } from "./payment.entity";


@Entity({name: 'order'})
export class OrderEntity extends AbstractEntity {
    @Column({
        name: 'total_price',
        type: 'float'
    })
    totalPrice: number;

    @Column({
        name: 'receipted_date',
        type: 'timestamp with time zone'
    })
    receiptedDate: Date;

    @Column({
        name: 'status',
        type: 'enum',
        enum: OrderStatusEnum
    })
    status: OrderStatusEnum;

    @Column({
        type: 'boolean',
        name: 'is_paid'
    })
    isPaid: boolean;

    @ManyToOne(
        () => UserEntity,
        (user) => user.orders
    )
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @ManyToOne(
        () => EmployeeEntity,
        (e) => e.orders
    )
    @JoinColumn({name: 'employee_id'})
    employee: EmployeeEntity;

    @OneToOne(
        () => PaymentEntity,
        (payment) => payment.order
    )
    payment: PaymentEntity;

    @OneToMany(
        () => OrderDetailEntity,
        (d) => d.order
    )
    details: OrderDetailEntity[];
}