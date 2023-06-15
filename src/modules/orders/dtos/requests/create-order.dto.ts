import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDTO extends AbstractDTO {
    @ApiProperty({
        name: 'totalPrice',
        example: 1000000
    })
    
    totalPrice;

    @
}