import { CategoryEntity } from "@modules/categories/database/entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCategoryDTO {
    @ApiProperty({
        name: 'name',
        example: 'Phần mềm'
    })
    name: string;

    @ApiProperty({
        name: 'imageId',
    })
    @IsString()
    imageId: string;

}