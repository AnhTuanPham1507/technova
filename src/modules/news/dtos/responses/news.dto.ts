import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { NewsEntity } from "@modules/news/database/entities/news.entity";
import { ApiProperty } from "@nestjs/swagger";


export class NewsDTO extends AbstractDTO {
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

    constructor(news: NewsEntity,  imagesDTO?: ImageDTO){
        super(news);
        this.title = news.title;
        this.content = news.content;
        this.description = news.description;
        this.image = imagesDTO;
    }
}