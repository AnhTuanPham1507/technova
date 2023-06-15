import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { ProductDTO } from "@modules/products/dtos/responses/product.dto";
import { ApiProperty } from "@nestjs/swagger";

export class BrandDTO extends AbstractDTO{

    @ApiProperty({
        name: 'name',
        example: 'Microsoft'
    })
    name: string;

    @ApiProperty({
        name: 'image',
        type: ImageDTO
    })
    image?: ImageDTO;

    @ApiProperty({
        name: 'products',
        isArray: true,
        type: ProductDTO
    })
    products?: ProductDTO[];

    constructor(brand: BrandEntity, imagesDTO?: ImageDTO,productsDTO?: ProductDTO[]) {
        super(brand);
        this.name = brand.name;
        this.products = productsDTO;
        this.image = imagesDTO;
    }
}