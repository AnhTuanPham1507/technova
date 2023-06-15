import { ApiProperty } from "@nestjs/swagger";
import {  IsString, IsUUID } from "class-validator";

export class CreateProductBenefitDTO {
    @ApiProperty({
        name: 'name',
        example: 'free'
    })
    @IsString()
    name: string;



    @ApiProperty({
        name: 'productId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    @IsUUID(4)
    productId: string;

}