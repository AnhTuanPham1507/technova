import { AbstractDTO } from "@common/dtos/abstract.dto";
import { AboutCompanyEntity } from "@modules/about-company/database/entities/about-company.entity";
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

    constructor(aboutCompany: AboutCompanyEntity){
        super(aboutCompany);
        this.title = aboutCompany.title;
        this.content = aboutCompany.content;
    }
}