import { AbstractDTO } from "@common/dtos/abstract.dto";
import { NewsEntity } from "@modules/news/database/entities/news.entity";
import { ApiProperty } from "@nestjs/swagger";


export class SolutionDTO extends AbstractDTO {
    @ApiProperty({
        name: 'title'
    })
    title: string;

    @ApiProperty({
        name: 'content'
    })
    content: string;

    constructor(news: NewsEntity){
        super(news);
        this.title = news.title;
        this.content = news.content;
    }
}