import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ProductBenefitEntity } from "@modules/products/database/entities/product-benefit.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BenefitValueDTO } from "./benefit-value.dto";
import { ProductDTO } from "./product.dto";


export class ProductBenefitDTO extends AbstractDTO {
    @ApiProperty({
        name: 'name',
        example: 'Expired time'
    })
    name: string;


    @ApiProperty({
        name: 'product',
        type: ProductDTO,
    })
    product?: ProductDTO;

    @ApiProperty({
        name: 'benefitValues',
        type: BenefitValueDTO,
        isArray: true
    })
    benefitValues?: BenefitValueDTO[];

    constructor(productBenefit: ProductBenefitEntity, benefitValuesDTO?: BenefitValueDTO[],productDTO?: ProductDTO){
        super(productBenefit);
        this.name = productBenefit.name;
        this.product = productDTO;
        this.benefitValues = benefitValuesDTO;
    }

}