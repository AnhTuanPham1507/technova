import { AbstractEntity } from "@common/abstract.entity";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { Column, Entity } from "typeorm";

@Entity({name: 'image'})
export class ImageEntity extends AbstractEntity {
    @Column({
        name: 'type',
    })
    type: string;

    @Column({
        name: 'path'
    })
    path: string;

    @Column({
        name: 'object_id'
    })
    objectId: string;

    @Column({
        name: 'object_type',
        type: 'enum',
        enum: ImageObjectTypeEnum
    })
    objectType: ImageObjectTypeEnum;
}