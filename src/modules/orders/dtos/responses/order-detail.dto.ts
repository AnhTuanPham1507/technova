import { AbstractDTO } from "@common/dtos/abstract.dto";
import { OrderDetailEntity } from "@modules/orders/database/entities/order-detail.entity";
import { ProductPackageDTO } from "@modules/products/dtos/responses/product-package.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDetailDTO extends AbstractDTO {
    @ApiProperty({
        name: 'price',
        type: 'float'
    })
    price: number;

    @ApiProperty({
        name: 'price',
        type: 'float'
    })
    quantity: number;

    @ApiProperty({
        name: 'productName',
    })
    productName: string;

    @ApiProperty({
        name: 'productPackage',
        type: ProductPackageDTO
    })
    productPackage?: ProductPackageDTO;

    constructor(orderDetail: OrderDetailEntity, productPackageDTO?: ProductPackageDTO){
        super(orderDetail);
        this.price = orderDetail.price;
        this.quantity = orderDetail.quantity;
        this.productName = orderDetail.productName;
        this.productPackage = productPackageDTO;
    }
}