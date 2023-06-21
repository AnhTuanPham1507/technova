import { AbstractEntity } from "@common/abstract.entity";
import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { OrderEntity } from "./order.entity";


@Entity({name: 'payment'})
export class PaymentEntity extends AbstractEntity {

    @Column({
        name: 'momo_id',
        type: 'bigint'
    })
    momoId: number;

    @OneToOne(
        () => OrderEntity,
        (order) => order.payment
    )
    @JoinColumn({name: 'order_id'})
    order: OrderEntity;

    @AfterLoad()
    transform(){
        this.momoId = Number(this.momoId);
    }
}