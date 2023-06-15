import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateAboutCompanyDTO {
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
}