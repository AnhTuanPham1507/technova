import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteImageDTO {
   @ApiProperty({
    name: 'imageIds',
    isArray: true
   })
   @IsString({each: true})
   imageIds;
}