import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";


export class CreateBannerDTO {
    @ApiProperty({
        name: 'title'
    })
    @IsString()
    title: string;

    @ApiProperty({
        name: 'collocate'
    })
    @IsNumber()
    collocate: number;

    @ApiProperty({
        name: 'imageId'
    })
    @IsUUID(4)
    imageId: string;
}