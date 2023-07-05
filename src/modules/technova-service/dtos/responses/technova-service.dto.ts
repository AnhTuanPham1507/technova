import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { TechnovaServiceEntity } from "@modules/technova-service/database/entities/technova-service.entity";
import { ApiProperty } from "@nestjs/swagger";


export class TechnovaServiceDTO extends AbstractDTO {
    @ApiProperty({
        name: 'title'
    })
    title: string;

    @ApiProperty({
        name: 'content'
    })
    content: string;
    
    @ApiProperty({
        name: 'description'
    })
    description: string;

    @ApiProperty({
        name: 'image',
        type: ImageDTO
    })
    image?: ImageDTO;

    constructor(aboutCompany: TechnovaServiceEntity, imagesDTO?: ImageDTO){
        super(aboutCompany);
        this.title = aboutCompany.title;
        this.content = aboutCompany.content;
        this.description = aboutCompany.description;
        this.image = imagesDTO;
    }
}