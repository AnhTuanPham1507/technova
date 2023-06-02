import { AbstractEntity } from "@common/abstract.entity";
import { newsTypeEnum } from "@constants/enums/news-type.enum";
import { Column, Entity, OneToMany } from "typeorm";
import { ReactEntity } from "./react.entity";
import { NewsTagEntity } from "./tag.entity";


@Entity({name: 'news'})
export class NewsEntity extends AbstractEntity {

    @Column({
        name: 'title',
        length: 50
    })
    title: string;

    @Column({
        name: 'content',
        type: 'text'
    })
    content: string;

    @Column({
        name: 'type',
        type: 'enum',
        enum: newsTypeEnum
    })
    type: newsTypeEnum;

    @OneToMany(
        () => NewsTagEntity,
        (newsTag) => newsTag.news
    )
    tags: NewsTagEntity[];

    @OneToMany(
        () => ReactEntity,
        (react) => react.news
    )
    reacts: ReactEntity[];
}