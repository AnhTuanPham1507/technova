import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ProductTagDTO extends AbstractDTO {
    @ApiProperty({
        name: 'name',
        example: '#sanphamtot'
    })
    name: string;
}