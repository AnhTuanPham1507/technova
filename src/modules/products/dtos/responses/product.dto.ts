import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { CategoryDTO } from "@modules/categories/dtos/responses/category.dto";
import { ImageEntity } from "@modules/images/database/entities/image.entity";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { DiscountDTO } from "./discount.dto";
import { ProductBenefitDTO } from "./product-benefit.dto";
import { ProductPackageDTO } from "./product-package.dto";
import { ProductTagDTO } from "./product-tag.dto";

export class ProductDTO extends AbstractDTO{
    @ApiProperty({
        name: 'name',
        example: 'Microsoft office'
    })
    name: string;

    @ApiProperty({
        name: 'description',
        type: 'text',
        example: 'Sản phẩm tốt'
    })
    description: string;

    @ApiProperty({
        name: 'brand',
        type: BrandDTO
    })
    brand?: BrandDTO;

    @ApiProperty({
        name: 'category',
        type: CategoryDTO
    })
    category?: CategoryDTO;

    @ApiProperty({
        name: 'image',
        type: ImageDTO
    })
    image?: ImageDTO;

    constructor(product: ProductEntity, brandDTO?: BrandDTO, categoryDTO?: CategoryDTO, benefitsDTO?: ProductBenefitDTO[], imageDTO?: ImageDTO){
        super(product);
        this.name = product.name;
        this.description = product.description;
        this.brand = brandDTO;
        this.category = categoryDTO;
        this.image = imageDTO;
    }
}