import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity } from "typeorm";


@Entity({name: 'banner'})
export class BannerEntity extends AbstractEntity {

    @Column({
        name: 'title',
        length: 50
    })
    title: string;

    @Column({
        name: 'collocate',
        type: 'int'
    })
    collocate: number;

    constructor(title: string, collocate: number){
        super();
        this.title = title;
        this.collocate = collocate;
    }
}