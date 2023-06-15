import { ApiProperty } from "@nestjs/swagger";
import {  IsString } from "class-validator";

export class UpdateProductBenefitDTO {
    @ApiProperty({
        name: 'name',
        example: 'free'
    })
    @IsString()
    name: string;

}