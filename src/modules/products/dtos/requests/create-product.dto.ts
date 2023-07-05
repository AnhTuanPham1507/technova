import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProductDTO {
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
        name: 'isContactToSell',
        type: 'boolean',
    })
    @IsBoolean()
    @Transform(({ value} ) => value === 'true')
    isContactToSell: boolean;

    @ApiProperty({
        name: 'brandId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    @IsUUID(4)
    brandId: string;

    @ApiProperty({
        name: 'categoryId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    @IsUUID(4)
    categoryId: string;

    @ApiProperty({
        name: 'imageId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    @IsUUID(4)
    imageId: string;

    @ApiProperty({
        name: 'imageIds',
        isArray: true,
        example: ['ff852415-ff06-47d3-a33b-4ad4782cc664']
    })
    @IsUUID(4,{each: true})
    @IsOptional()
    imageDescriptionIds: string[];

}