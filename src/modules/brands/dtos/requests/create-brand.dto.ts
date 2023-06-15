import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBrandDTO {

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