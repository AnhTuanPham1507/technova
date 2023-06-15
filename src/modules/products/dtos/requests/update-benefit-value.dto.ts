import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateBenefitValueDTO {

    @ApiProperty({
        name: 'value',
        example: '-'
    })
    @IsString()
    value: string;

}