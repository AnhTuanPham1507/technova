import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";


export class ProductBenefitDTO extends AbstractDTO {
    @ApiProperty({
        name: 'name',
        example: 'Expired time'
    })
    name: string;
}