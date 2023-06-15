import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity } from "typeorm";


@Entity({name: 'solution'})
export class SolutionEntity extends AbstractEntity {

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