import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity } from "typeorm";


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

    constructor(title: string, content: string){
        super();
        this.title = title;
        this.content = content;
    }
}