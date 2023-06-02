import { ApiProperty } from "@nestjs/swagger";
import { ReviewEntity  } from "@modules/products/database/entities/review.entity";

export class ReviewDTO {
    @ApiProperty({
        name: 'star',
        type: 'float'
    })
    star: number;

    @ApiProperty({
        name: 'content',
        type: 'text'
    })
    content: string;

    constructor(review: ReviewEntity){
        this.star = review.star;
        this.content = review.content;
    }
}