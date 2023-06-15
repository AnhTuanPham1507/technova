import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";


export class ProductPageOptionsDTO extends PageOptionsDTO {

    @ApiProperty({
        name: 'brandId',
        example: 'uuid'
    })
    @IsUUID(4)
    @IsOptional()
    brandId: string;

    @ApiProperty({
        name: 'categoryId',
        example: 'uuid'
    })
    @IsUUID(4)
    @IsOptional()
    categoryId: string;
}