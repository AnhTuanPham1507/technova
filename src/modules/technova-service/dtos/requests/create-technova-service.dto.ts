import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";


export class CreateTechnovaServiceDTO {
    @ApiProperty({
        name: 'title'
    })
    @IsString()
    title: string;

    @ApiProperty({
        name: 'content'
    })
    @IsString()
    content: string;

    @ApiProperty({
        name: 'description'
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        name: 'imageId',
    })
    @IsUUID(4)
    imageId: string;
}