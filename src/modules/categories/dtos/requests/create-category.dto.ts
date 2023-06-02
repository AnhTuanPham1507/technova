import { CategoryEntity } from "@modules/categories/database/entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDTO {
    @ApiProperty({
        name: 'name',
        example: 'Phần mềm'
    })
    name: string;

    constructor(category: CategoryEntity){
        this.name = category.name;
    }
}