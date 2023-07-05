import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { CategoryDTO } from "@modules/categories/dtos/responses/category.dto";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

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
        name: 'isContactToSell',
        type: 'boolean',
    })

    isContactToSell: boolean;

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

    constructor(product: ProductEntity, brandDTO?: BrandDTO, categoryDTO?: CategoryDTO, imageDTO?: ImageDTO){
        super(product);
        this.name = product.name;
        this.description = product.description;
        this.isContactToSell = Boolean(product.isContactToSell);
        this.brand = brandDTO;
        this.category = categoryDTO;
        this.image = imageDTO;
    }
}