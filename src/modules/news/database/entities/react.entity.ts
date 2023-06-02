import { AbstractEntity } from "@common/abstract.entity";
import { ReactTypeEnum } from "@constants/enums/react.enum";
import { AccountEntity } from "@modules/auth/database/entities/account.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { NewsEntity } from "./news.entity";

@Entity({name: 'react'})
export class ReactEntity extends AbstractEntity {
    @Column({
        name: 'type',
        type: 'enum',
        enum: ReactTypeEnum
    })
    type: ReactTypeEnum;

    @ManyToOne(
        () => AccountEntity,
        (account) => account.reacts
    )
    @JoinColumn({name: 'author_id'})
    author: AccountEntity;

    @ManyToOne(
        () => NewsEntity,
        (news) => news.reacts
    )
    @JoinColumn({name: 'news_id'})
    news: NewsEntity;
}