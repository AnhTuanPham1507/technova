

import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductBenefitEntity } from "./product-benefit.entity";
import { ProductPackageEntity } from "./product-package.entity";
@Entity({name: 'benefit_value'})
export class BenefitValueEntity extends AbstractEntity {

    @Column({
        name: 'value',
        length: 255
    })
    value: string;

    @ManyToOne(
        () => ProductPackageEntity,
        (p) => p.benefitValues
    )
    @JoinColumn({name: 'product_package_id'})
    productPackage: ProductPackageEntity;

    @ManyToOne(
        () => ProductBenefitEntity,
        (product) => product.benefitValues
    )
    @JoinColumn({name: 'product_benefit_id'})
    benefit: ProductBenefitEntity;

    constructor(value: string, productPackage: ProductPackageEntity, benefit: ProductBenefitEntity){
        super();
        this.value = value;
        this.productPackage = productPackage;
        this.benefit = benefit;
    }
}