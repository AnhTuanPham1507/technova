import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { NewsEntity } from "@modules/news/database/entities/news.entity";
import { SolutionEntity } from "@modules/solution/database/entities/solution.entity";
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
    
    @ApiProperty({
        name: 'description'
    })
    description: string;

    @ApiProperty({
        name: 'image',
        type: ImageDTO
    })
    image?: ImageDTO;

    constructor(solution: SolutionEntity, imagesDTO?: ImageDTO){
        super(solution);
        this.title = solution.title;
        this.content = solution.content;
        this.description = solution.description;
        this.image = imagesDTO;
    }
}