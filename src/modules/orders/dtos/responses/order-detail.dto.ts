import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDetailDTO extends AbstractDTO {
    @ApiProperty({
        name: 'price',
        type: 'float'
    })
    price: number;

    @Column({
        name: 'quantity',
        type: 'float'
    })
    quantity: number;

    @ManyToOne(
        () => ProductPackageEntity,
        (p) => p.orderDetails
    )
    @JoinColumn({name: 'product_package_id'})
    productPackage: ProductPackageEntity;
}