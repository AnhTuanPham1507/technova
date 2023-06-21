import { AbstractDTO } from "@common/dtos/abstract.dto";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { OrderEntity } from "@modules/orders/database/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";
import { OrderDetailDTO } from "./order-detail.dto";

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
        name: 'details',
        type: OrderDetailDTO,
        isArray: true,
    })
    details: OrderDetailDTO[];

    constructor(order: OrderEntity, details: OrderDetailDTO[]){
        super(order);
        this.totalPrice = order.totalPrice;
        this.status = order.status;
        this.customerName = order.customerName;
        this.phone = order.phone;
        this.email = order.email;
        this.isPaid = order.isPaid;
        this.details = details;
    }
}