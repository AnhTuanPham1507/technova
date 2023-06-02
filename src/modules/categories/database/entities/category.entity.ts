import { AbstractEntity } from "@common/abstract.entity";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity({name: 'category'})
export class CategoryEntity extends AbstractEntity {

    @Column({
        name: 'name',
        length: 20
    })
    name: string;

    @OneToMany(
        () => ProductEntity,
        (product) => product.category
    )
    products: ProductEntity[];

    constructor(name: string, products: ProductEntity[]){
        super();
        this.name = name;
        this.products = products;
    }
}