import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class ProductPageOptionsDTO extends PageOptionsDTO {

    @ApiProperty({
        name: 'brandIds',
        isArray: true,
        nullable: true
    })
    @IsUUID(4,{each: true})
    @IsOptional()
    brandIds: string[];

    @ApiProperty({
        name: 'categoryIds',
        isArray: true,
        nullable: true
    })
    @IsUUID(4,{each: true, })
    @IsOptional()
    categoryIds: string[];
}