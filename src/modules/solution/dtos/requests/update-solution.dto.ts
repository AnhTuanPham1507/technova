import { AbstractDTO } from "@common/dtos/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateSolutionDTO  {
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