import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateNewsDTO  {
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