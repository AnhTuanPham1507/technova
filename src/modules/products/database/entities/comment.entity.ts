import { AbstractEntity } from "@common/abstract.entity";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({name: 'comment'})
export class CommentEntity extends AbstractEntity {

    @Column({
        name: 'content',
        type: 'text'
    })
    content: string;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.comments
    )
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    @ManyToOne(
        () => AccountEntity,
        (product) => product.comments
    )
    @JoinColumn({name: 'author_id'})
    author: AccountEntity;
}