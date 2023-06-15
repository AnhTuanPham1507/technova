import { AbstractEntity } from "@common/abstract.entity";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { ImageTypeEnum } from "@constants/enums/image-type.enum";
import { Column, Entity } from "typeorm";

@Entity({name: 'image'})
export class ImageEntity extends AbstractEntity {
    @Column({
        name: 'type',
        enum: ImageTypeEnum,
        type: 'enum'
    })
    type: string;

    @Column({
        name: 'path'
    })
    path: string;

    @Column({
        name: 'object_id',
        nullable: true
    })
    objectId?: string;

    @Column({
        name: 'object_type',
        type: 'enum',
        enum: ImageObjectTypeEnum,
        nullable: true
    })
    objectType?: ImageObjectTypeEnum;

    @Column({
        name: 'cloudinary_id',
        nullable: true
    })
    cloudinaryId: string;

    constructor(type: string, path: string, cloudinaryId: string, userId: string, objectId?: string, objectType?: ImageObjectTypeEnum){
        super();
        this.type = type;
        this.path = path;
        this.objectId; objectId;
        this.objectType = objectType;
        this.cloudinaryId = cloudinaryId;
        this.createdBy = userId;
        this.updatedBy = userId
    }
}