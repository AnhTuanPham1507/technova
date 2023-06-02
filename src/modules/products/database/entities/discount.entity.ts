import { AbstractEntity } from "@common/abstract.entity";
import { discountStatusEnum } from "@constants/enums/discount-status.enum";
import { Column, Entity, OneToOne } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({name: 'discount'})
export class DiscountEntity extends AbstractEntity {
    @Column({
        name: 'percent',
        type: 'float'
    })
    discountPercent: number;

    @Column({
        name: 'status',
        type: 'enum',
        enum: discountStatusEnum
    })
    status: discountStatusEnum;

    @Column({
        name: 'expired_date',
        type: 'timestamp with time zone'
    })
    expiredDate: Date;

    @OneToOne(
        () => ProductEntity,
        (product) => product.discount
    )
    product: ProductEntity;
}