import { AbstractDTO } from "@common/dtos/abstract.dto";
import { CategoryEntity } from "@modules/categories/database/entities/category.entity";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
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
    products?: ProductDTO[];

    @ApiProperty({
        name: 'image',
        type: ImageDTO,
    })
    image?: ImageDTO;

    constructor(category: CategoryEntity, imageDTO?: ImageDTO, productsDTO?: ProductDTO[]){
        super(category);
        this.name = category.name;
        this.products = productsDTO;
        this.image = imageDTO;
    }
}