import { AbstractDTO } from "@common/dtos/abstract.dto";
import { CategoryEntity } from "@modules/categories/database/entities/category.entity";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { ProductDTO } from "@modules/products/dtos/responses/product.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryDTO extends AbstractDTO{
    
    @ApiProperty({
        name: 'name',
        example: 'Phần mềm'
    })
    name: string;

    @ApiProperty({
        name: 'products',
        type: ProductDTO,
        isArray: true
    })
    products: ProductDTO[];

    constructor(category: CategoryEntity){
        super(category);
        this.name = category.name;
        this.products = category.products ? category.products.map(product => new ProductDTO(product)) : [];
    }
}