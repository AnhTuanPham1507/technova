import { AbstractEntity } from "@common/abstract.entity";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity({name: 'brand'})
export class BrandEntity extends AbstractEntity {

    @Column({
        name: 'name',
        length: 20
    })
    name: string;

    @OneToMany(
        () => ProductEntity,
        (product) => product.brand
    )
    products: ProductEntity[];

    constructor(name: string, products: ProductEntity[]){
        super();
        this.name = name;
        this.products = products;
    }
}