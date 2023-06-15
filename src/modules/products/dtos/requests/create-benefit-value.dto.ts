import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateProductBenefitDTO {

    @ApiProperty({
        name: 'value',
        example: '-'
    })
    @IsString()
    value: string;

    @ApiProperty({
        name: 'packageId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    @IsUUID(4)
    packageId: string;

    @ApiProperty({
        name: 'benefitId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    @IsUUID(4)
    benefitId: string;
}