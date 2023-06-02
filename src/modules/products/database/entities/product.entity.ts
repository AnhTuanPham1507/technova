import { AbstractEntity } from "@common/abstract.entity";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
import { CategoryEntity } from "@modules/categories/database/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CommentEntity } from "./comment.entity";
import { DiscountEntity } from "./discount.entity";
import { ProductBenefitEntity } from "./product-benefit.entity";
import { ProductPackageEntity } from "./product-package.entity";
import { ProductTagEntity } from "./product-tag.entity";
import { ReviewEntity } from "./review.entity";

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
        () => ProductBenefitEntity,
        (tag) => tag.product
    )
    benefits: ProductBenefitEntity[];

    @OneToMany(
        () => ProductPackageEntity,
        (p) => p.product
    )
    packages: ProductPackageEntity[];

    @OneToMany(
        () => ReviewEntity,
        (p) => p.product
    )
    reviews: ReviewEntity[];

    @OneToMany(
        () => CommentEntity,
        (p) => p.product
    )
    comments: CommentEntity[];

    constructor(name: string, description: string, brand: BrandEntity | null, category: CategoryEntity | null, tags: ProductTagEntity[], benefits: ProductBenefitEntity[]){
        super();
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.benefits = benefits;
        this.tags = tags;
    }
}


