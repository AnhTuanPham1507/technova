import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class UpdateProductDTO {

    @ApiProperty({
        name: 'name',
        example: 'Microsoft office'
    })
    @IsString()
    name: string;

    @ApiProperty({
        name: 'description',
        type: 'text',
        example: 'Sản phẩm tốt'
    })
    @IsString()
    description: string;

    @ApiProperty({
        name: 'brandId',
        type: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    brandId: string;

    @ApiProperty({
        name: 'categoryId',
        type: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    categoryId: string;

    @ApiProperty({
        name: 'tagIds',
        isArray: true
    })
    @IsArray()
    tagIds: string[];

    @ApiProperty({
        name: 'benefitIds',
        isArray: true
    })
    @IsArray()
    benefitIds: string[];
}