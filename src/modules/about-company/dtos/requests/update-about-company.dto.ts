import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateAboutCompanyDTO{
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
}