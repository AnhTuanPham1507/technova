import { AbstractEntity } from "@common/abstract.entity";
import { CurrencyEnum } from "@constants/enums/currency.enum";
import { OrderDetailEntity } from "@modules/orders/database/entities/order-detail.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ProductBenefitEntity } from "./product-benefit.entity";
import { ProductEntity } from "./product.entity";

@Entity({name: 'product_package'})
export class ProductPackageEntity extends AbstractEntity {

    @Column({
        name: 'price',
        type: 'float'
    })
    price: number;

    @Column({
        name: 'currency',
        type: 'enum',
        enum: CurrencyEnum
    })
    currency: CurrencyEnum;

    @Column({
        name: 'time_range',
        type: 'timestamp with time zone'
    })
    timeRange: Date;

    @Column({
        name: 'in_stock_quantity'
    })
    inStockQuantity: number;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.packages
    )
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    @ManyToMany(
        () => ProductBenefitEntity,
        (b) => b.packages
    )
    benefits: ProductBenefitEntity[];

    @OneToMany(
        () => OrderDetailEntity,
        (d) => d.productPackage
    )
    orderDetails: OrderDetailEntity[];
}