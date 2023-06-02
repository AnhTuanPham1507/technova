import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";


@Entity({name: 'product_tag'})
export class ProductTagEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 10
    })
    name: string;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.tags
    )
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;
}