import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";


export class UpdateTechnovaServiceDTO{
    @ApiProperty({
        name: 'title'
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({
        name: 'content'
    })
    @IsString()
    @IsOptional()
    content: string;

    @ApiProperty({
        name: 'imageId'
    })
    @IsUUID(4)
    @IsOptional()
    imageId: string;
}