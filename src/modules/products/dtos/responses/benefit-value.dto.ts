import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BenefitValueEntity } from "@modules/products/database/entities/benefit-value.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ProductBenefitDTO } from "./product-benefit.dto";
import { ProductPackageDTO } from "./product-package.dto";


export class BenefitValueDTO extends AbstractDTO {
    @ApiProperty({
        name: 'value',
        example: '-'
    })
    value: string;

    @ApiProperty({
        name: 'productPackage',
        type: ProductPackageDTO,
    })
    productPackage?: ProductPackageDTO;

    @ApiProperty({
        name: 'benefit',
        type: ProductBenefitDTO,
    })
    benefit?: ProductBenefitDTO;

    constructor(benefitValue: BenefitValueEntity, packageDTO?: ProductPackageDTO, benefitDTO?: ProductBenefitDTO){
        super(benefitValue);
        this.value = benefitValue.value;
        this.productPackage = packageDTO;
        this.benefit = benefitDTO;
    }

}