import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";


export class CommentDTO extends AbstractDTO {
    @ApiProperty({
        name: 'content',
        type: 'text',
        example: 'Sản phẩm tuyệt vời'
    })
    content: string;
}