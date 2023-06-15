import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateBrandDTO {

    @ApiProperty({
        name: 'name',
        example: 'Microsoft'
    })
    @IsString()
    name: string;

    @ApiProperty({
        name: 'imageId',
    })
    @IsString()
    imageId: string;
}