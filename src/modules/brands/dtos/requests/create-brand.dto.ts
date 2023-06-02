import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandEntity } from "@modules/brands/database/entities/brand.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBrandDTO extends AbstractDTO{

    @ApiProperty({
        name: 'name',
        example: 'Microsoft'
    })
    name: string;

}