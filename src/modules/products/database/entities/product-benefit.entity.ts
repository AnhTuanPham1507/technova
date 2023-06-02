

import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { ProductPackageEntity } from "./product-package.entity";
import { ProductEntity } from "./product.entity";


@Entity({name: 'product_benefit'})
export class ProductBenefitEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 100
    })
    name: string;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.benefits
    )
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    @ManyToMany(
        () => ProductPackageEntity,
        (p) => p.benefits
    )
    @JoinTable()
    packages: ProductPackageEntity[];
}