import { AbstractDTO } from "@common/dtos/abstract.dto";
import { CurrencyEnum } from "@constants/enums/currency.enum";
import { TimeRangeEnum } from "@constants/enums/time-range.enum";
import { ProductPackageEntity } from "@modules/products/database/entities/product-package.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BenefitValueDTO } from "./benefit-value.dto";
import { ProductDTO } from "./product.dto";

export class ProductPackageDTO extends AbstractDTO {
    @ApiProperty({
        name: 'name',
        example: 'free'
    })
    name: string;

    @ApiProperty({
        name: 'userNumber',
        example: 1
    })
    userNumber: number;

    @ApiProperty({
        name: 'timeRange',
        example: 1
    })
    timeRangeNumber: number;

    @ApiProperty({
        name: 'price',
        type: 'enum',
        enum: TimeRangeEnum,
        example: TimeRangeEnum.DAY
    })
    timeRange: TimeRangeEnum;
    
    @ApiProperty({
        name: 'price',
        example: 300000
    })
    price: number;

    @ApiProperty({
        name: 'currency',
        type: 'enum',
        enum: CurrencyEnum,
        example: CurrencyEnum.vnd
    })
    currency: CurrencyEnum;

    @ApiProperty({
        name: 'product',
        type: ProductDTO
    })
    product?: ProductDTO;

    @ApiProperty({
        name: 'benefitValues',
        type: BenefitValueDTO,
        isArray: true
    })
    benefitValues?: BenefitValueDTO[];

    constructor(productPackage: ProductPackageEntity, benefitValuesDTO?: BenefitValueDTO[], productDTO?: ProductDTO){
        super(productPackage)
        this.name = productPackage.name;
        this.userNumber = productPackage.userNumber;
        this.timeRange = productPackage.timeRange;
        this.timeRangeNumber = productPackage.timeRangeNumber;
        this.price = productPackage.price;
        this.currency = productPackage.currency;
        this.product = productDTO;
        this.benefitValues = benefitValuesDTO;
    }
}