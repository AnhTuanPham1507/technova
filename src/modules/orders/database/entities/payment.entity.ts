import { AbstractEntity } from "@common/abstract.entity";
import { paymentTypeEnum } from "@constants/enums/payment-type.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { OrderEntity } from "./order.entity";


@Entity({name: 'payment'})
export class PaymentEntity extends AbstractEntity {

    @Column({
        name: 'momo_id'
    })
    momoId: string;

    @Column({
        name: 'type',
        type: 'enum',
        enum: paymentTypeEnum
    })
    type: paymentTypeEnum;

    @OneToOne(
        () => OrderEntity,
        (order) => order.payment
    )
    @JoinColumn({name: 'order_id'})
    order: OrderEntity;
}