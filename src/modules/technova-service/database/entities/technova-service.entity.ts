import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity } from "typeorm";


@Entity({name: 'technova_service'})
export class TechnovaServiceEntity extends AbstractEntity {

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
        name: 'description',
        type: 'text',
        default: ''
    })
    description: string;

    constructor(title: string, content: string, description: string){
        super();
        this.title = title;
        this.content = content;
        this.description = description;
    }
}