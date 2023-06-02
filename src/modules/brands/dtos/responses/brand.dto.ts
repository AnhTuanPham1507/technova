import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
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
        name: 'products',
        isArray: true,
        type: ProductDTO
    })
    products: ProductDTO[];

    constructor(brand: BrandEntity) {
        super(brand);
        this.name = brand.name;
        this.products = brand.products ? brand.products.map(product => new ProductDTO(product)): [];
    }
}