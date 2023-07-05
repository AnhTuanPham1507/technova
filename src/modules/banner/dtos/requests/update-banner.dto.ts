import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";


export class UpdateBannerDTO {
    @ApiProperty({
        name: 'title'
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({
        name: 'collocate'
    })
    @IsNumber()
    @IsOptional()
    collocate: number;

    @ApiProperty({
        name: 'imageId'
    })
    @IsUUID(4)
    @IsOptional()
    imageId: string;
}