import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { NewsEntity } from "./news.entity";

@Entity({name: 'news_tag'})
export class NewsTagEntity extends AbstractEntity {
    @Column({
        name: 'title',
        length: 20
    })
    title: string;

    @ManyToOne(
        () => NewsEntity,
        (news) => news.tags
    )
    @JoinColumn({name: 'news_id'})
    news: NewsEntity;
}