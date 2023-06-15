import { AbstractEntity } from "@common/abstract.entity";
import { CurrencyEnum } from "@constants/enums/currency.enum";
import { TimeRangeEnum } from "@constants/enums/time-range.enum";
import { OrderDetailEntity } from "@modules/orders/database/entities/order-detail.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BenefitValueEntity } from "./benefit-value.entity";
import { ProductBenefitEntity } from "./product-benefit.entity";
import { ProductEntity } from "./product.entity";

@Entity({name: 'product_package'})
export class ProductPackageEntity extends AbstractEntity {

    @Column({
        name: 'name',
        length: 50
    })
    name: string;

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
        name: 'user_number',
    })
    userNumber: number;

    @Column({
        name: 'time_range'
    })
    timeRange: TimeRangeEnum;

    @Column({
        name: 'time_range_number'
    })
    timeRangeNumber: number;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.packages
    )
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    @OneToMany(
        () => BenefitValueEntity,
        (b) => b.productPackage
    )
    benefitValues: BenefitValueEntity[];

    @OneToMany(
        () => OrderDetailEntity,
        (d) => d.productPackage
    )
    orderDetails: OrderDetailEntity[];

    constructor(name: string, price: number, currency: CurrencyEnum, userNumber: number, timeRange: TimeRangeEnum, timeRangeNumber: number, product: ProductEntity){
        super();
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.product = product;
        this.userNumber = userNumber;
        this.timeRange = timeRange;
        this.timeRangeNumber = timeRangeNumber;
    }
}