import { AbstractDTO } from "@common/dtos/abstract.dto";
import { AboutCompanyEntity } from "@modules/about-company/database/entities/about-company.entity";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { ApiProperty } from "@nestjs/swagger";


export class AboutCompanyDTO extends AbstractDTO {
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

    constructor(aboutCompany: AboutCompanyEntity, imagesDTO?: ImageDTO){
        super(aboutCompany);
        this.title = aboutCompany.title;
        this.content = aboutCompany.content;
        this.description = aboutCompany.description;
        this.image = imagesDTO;
    }
}