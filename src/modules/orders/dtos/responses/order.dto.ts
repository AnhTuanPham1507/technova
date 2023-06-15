import { AbstractDTO } from "@common/dtos/abstract.dto";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDTO extends AbstractDTO {
    @ApiProperty({
        name: 'totalPrice',
        example: 1000000
    })
    totalPrice: number;

    @ApiProperty({
        name: 'status',
        example: OrderStatusEnum.success
    })
    status: OrderStatusEnum;

    @ApiProperty({
        name: 'isPaid',
        example: true
    })
    isPaid: boolean;

    @ApiProperty({
        name: 'customerName',
        example: 'Tuan Pham'
    })
    customerName: string;

    @ApiProperty({
        name: 'phone',
        example: '0778821404'
    })
    phone: string;

    @ApiProperty({
        name: 'email',
        example: 'abc@gmail.com'
    })
    email: string;

    @ApiProperty({
        name: 'email',
        example: 'abc@gmail.com'
    })
    details: string;
}