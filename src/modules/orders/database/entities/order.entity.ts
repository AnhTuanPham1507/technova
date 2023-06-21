import { AbstractEntity } from "@common/abstract.entity";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { EmployeeEntity } from "@modules/clients/database/entities/employee.entity";
import { UserEntity } from "@modules/clients/database/entities/user.entity";
import { IsEmail, IsPhoneNumber } from "class-validator";
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
        name: 'status',
        type: 'enum',
        enum: OrderStatusEnum,
        default: OrderStatusEnum.pending
    })
    status: OrderStatusEnum;

    @Column({
        type: 'boolean',
        name: 'is_paid',
        default: false
    })
    isPaid: boolean;

    @Column({
        name: 'customer_name',
        length: 50
    })
    customerName: string;

    @Column({
        name: 'phone',
        length: 15
    })
    @IsPhoneNumber('VI')
    phone: string;

     @Column({
        name: 'email',
        length: 50
    })
    @IsEmail()
    email: string;

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