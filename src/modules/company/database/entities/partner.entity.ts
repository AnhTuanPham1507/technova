import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity } from "typeorm";


@Entity({name: 'partner'})
export class PartnerEntity extends AbstractEntity {
    @Column({
        name: 'name',
        length: 20
    })
    name: string;
}