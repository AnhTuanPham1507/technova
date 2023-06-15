import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class UpdateImageDTO {
   @ApiProperty({
    name: 'imageIds',
    isArray: true
   })
   @IsString({each: true})
   imageIds;

   @ApiProperty({
    name: 'objectId'
   })
   @IsString()
   objectId: string;

   @ApiProperty({
    name: 'objectType',
    type: 'enum',
    enum: ImageObjectTypeEnum
   })
   @IsEnum(ImageObjectTypeEnum)
   objectType: ImageObjectTypeEnum;
}