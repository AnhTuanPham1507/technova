import { AbstractEntity } from "@common/abstract.entity";
import { ProductPackageEntity } from "@modules/products/database/entities/product-package.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity({name: 'order_detail'})
export class OrderDetailEntity extends AbstractEntity {
    @Column({
        name: 'price',
        type: 'float'
    })
    price: number;

    @Column({
        name: 'quantity',
        type: 'float'
    })
    quantity: number;

    @ManyToOne(
        () => ProductPackageEntity,
        (p) => p.orderDetails
    )
    @JoinColumn({name: 'product_package_id'})
    productPackage: ProductPackageEntity;

    @ManyToOne(
        () => OrderEntity,
        (o) => o.details
    )
    @JoinColumn({name: 'order_id'})
    order: OrderEntity;
}