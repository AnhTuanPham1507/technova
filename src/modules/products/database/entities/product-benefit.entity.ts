

import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity, JoinColumn ,ManyToOne, OneToMany } from "typeorm";
import { BenefitValueEntity } from "./benefit-value.entity";
import { ProductEntity } from "./product.entity";
@Entity({name: 'product_benefit'})
export class ProductBenefitEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 100
    })
    name: string;

    @OneToMany(
        () => BenefitValueEntity,
        (b) => b.benefit
    )
    benefitValues: BenefitValueEntity[];

    @ManyToOne(
        () => ProductEntity,
        (product) => product.benefits
    )
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    constructor(name: string, product: ProductEntity){
        super();
        this.name = name;
        this.product = product;
    }
}