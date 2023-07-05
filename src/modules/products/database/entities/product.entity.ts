import { AbstractEntity } from "@common/abstract.entity";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
import { CategoryEntity } from "@modules/categories/database/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { DiscountEntity } from "./discount.entity";
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

    @Column({
        name: 'is_contact_to_sell',
        type: 'boolean',
        default: false
    })
    isContactToSell: boolean;

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


    constructor(name: string, description: string, isContactToSell: boolean, brand: BrandEntity, category: CategoryEntity){
        super();
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.isContactToSell = isContactToSell;
    }
}


