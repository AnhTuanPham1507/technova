import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BannerEntity } from "@modules/banner/database/entities/banner.entity";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { ApiProperty } from "@nestjs/swagger";


export class BannerDTO extends AbstractDTO {
    @ApiProperty({
        name: 'title'
    })
    title: string;

    @ApiProperty({
        name: 'collocate'
    })
    collocate: number;

    @ApiProperty({
        name: 'image',
        type: ImageDTO
    })
    image?: ImageDTO;

    constructor(banner: BannerEntity, image?: ImageDTO){
        super(banner);
        this.title = banner.title;
        this.collocate = banner.collocate;
        this.image = image;
    }
}