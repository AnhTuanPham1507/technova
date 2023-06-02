import { AbstractEntity } from "@common/abstract.entity";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({name: 'review'})
export class ReviewEntity extends AbstractEntity {
    @Column({
        name: 'star',
        type: 'float'
    })
    star: number;

    @Column({
        name: 'content',
        type: 'text'
    })
    content: string;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.reviews
    )
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    @ManyToOne(
        () => AccountEntity,
        (product) => product.reviews
    )
    @JoinColumn({name: 'author_id'})
    author: AccountEntity;
}