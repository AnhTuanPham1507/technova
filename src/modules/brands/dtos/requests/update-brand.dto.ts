import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBrandDTO extends AbstractDTO{

    @ApiProperty({
        name: 'name',
        example: 'Microsoft'
    })
    name: string;

    @ApiProperty({
        name: 'productIds',
        isArray: true,
    })
    productIds: string[];
}