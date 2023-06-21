import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateOrderDetailDTO  {
    @ApiProperty({
        name: 'price',
        type: 'float',
        example: 1000000
    })
    price: number;

    @ApiProperty({
        name: 'price',
        type: 'float',
        example: 10
    })
    quantity: number;

    @ApiProperty({
        name: 'productName',
        example: 'Microsoft word - free'
    })
    productName: string;

    @ApiProperty({
        name: 'productPackageId',
        example: 'UUID'
    })
    @IsUUID(4)
    productPackageId: string;
}