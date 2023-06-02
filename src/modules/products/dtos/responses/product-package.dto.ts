import { AbstractDTO } from "@common/dtos/abstract.dto";
import { CurrencyEnum } from "@constants/enums/currency.enum";
import { ProductPackageEntity } from "@modules/products/database/entities/product-package.entity";
import { ApiProperty } from "@nestjs/swagger";


export class ProductPackageDTO extends AbstractDTO {
    @ApiProperty({
        name: 'price',
        type: 'float'
    })
    price: number;

    @ApiProperty({
        name: 'currency',
        type: 'enum',
        enum: CurrencyEnum
    })
    currency: CurrencyEnum;

    @ApiProperty({
        name: 'timeRange',
        type: 'timestamp with time zone'
    })
    timeRange: Date;

    @ApiProperty({
        name: 'inStockQuantity'
    })
    inStockQuantity: number;

    constructor(productPackage: ProductPackageEntity){
        super(productPackage);
        this.currency = productPackage.currency;
        this.inStockQuantity = productPackage.inStockQuantity;
        this.timeRange = productPackage.timeRange;
    }
}