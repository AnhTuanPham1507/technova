import { AbstractDTO } from "@common/dtos/abstract.dto";
import { discountStatusEnum } from "@constants/enums/discount-status.enum";
import { ApiProperty } from "@nestjs/swagger";


export class DiscountDTO extends AbstractDTO {
    @ApiProperty({
        name: 'percent',
        type: 'float'
    })
    discountPercent: number;

    @ApiProperty({
        name: 'status',
        type: 'enum',
        enum: discountStatusEnum
    })
    status: discountStatusEnum;

    @ApiProperty({
        name: 'expired_date',
        type: 'timestamp with time zone'
    })
    expiredDate: Date;
}