import { AbstractEntity } from "@common/abstract.entity";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
import { CategoryEntity } from "@modules/categories/database/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { DiscountEntity } from "./discount.entity";
import { ProductBenefitEntity } from "./product-benefit.entity";
import { ProductPackageEntity } from "./product-package.entity";
import { ProductTagEntity } from "./product-tag.entity";

@Entity({name: 'product'})
export class ProductEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 20
    })
    name: string;

    @Column({
        name: 'description',
        type: 'text'
    })
    description: string;

    @ManyToOne(
        () => BrandEntity,
        (brand) => brand.products
    )
    @JoinColumn({name: 'brand_id'})
    brand: BrandEntity | null;

    @ManyToOne(
        () => CategoryEntity,
        (category) => category.products
    )
    @JoinColumn({name: 'category_id'})
    category: CategoryEntity | null;

    @OneToOne(
        () => DiscountEntity,
        (discount) => discount.product,
    )
    @JoinColumn({name: 'discount_id'})
    discount: DiscountEntity;

    @OneToMany(
        () => ProductTagEntity,
        (tag) => tag.product
    )
    tags: ProductTagEntity[];

    @OneToMany(
        () => ProductPackageEntity,
        (p) => p.product
    )
    packages: ProductPackageEntity[];

    @OneToMany(
        () => ProductPackageEntity,
        (b) => b.product
    )
    benefits: ProductPackageEntity[];


    constructor(name: string, description: string, brand: BrandEntity, category: CategoryEntity){
        super();
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.category = category;
    }
}


