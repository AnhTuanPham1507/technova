import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { ImageTypeEnum } from "@constants/enums/image-type.enum";
import { ImageEntity } from "@modules/images/database/entities/image.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ImageDTO extends AbstractDTO{

    @ApiProperty({
        name: 'type',
        type: 'eum',
        enum: ImageTypeEnum,
        example: ImageTypeEnum.JPG
    })
    type: string;

    @ApiProperty({
        name: 'path',
        example: 'image/name.jpg'
    })
    path: string;

    @ApiProperty({
        name: 'objectId',
        example: '123-abc'
    })
    objectId?: string;

    @ApiProperty({
        name: 'objectType',
        type: 'enum',
        enum: ImageObjectTypeEnum,
        example: ImageObjectTypeEnum.PRODUCT
    })
    objectType?: ImageObjectTypeEnum;

    constructor(image: ImageEntity){
        super(image);
        this.type = image.type;
        this.path = image.path;
        this.objectId = image.objectId;
        this.objectType = image.objectType;
    }
}