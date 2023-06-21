import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import {  IsBoolean, IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";

export class UpdateOrderDTO  {
   
    @ApiProperty({
        name: 'isPaid',
        example: true
    })
    @IsBoolean()
    @IsOptional()
    isPaid: boolean;

    @ApiProperty({
        name: 'status',
        example: OrderStatusEnum.success
    })
    @IsEnum(OrderStatusEnum)
    @IsOptional()
    status: OrderStatusEnum;

}