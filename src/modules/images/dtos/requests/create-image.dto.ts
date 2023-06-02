import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateImageDTO {

    @ApiProperty({
        name: 'fileName',
        example: 'abc',
      })
      @IsString({
        message: 'fileName is required',
      })
      fileName: string;
    
      @ApiProperty({
        name: 'mimeType',
        example: 'pdf',
      })
      @IsString({
        message: 'mimeType is required',
      })
      mimetype: string;
    
      @ApiProperty({
        name: 'originalName',
        example: 'abc',
      })
      @IsString({
        message: 'originalName is required',
      })
      originalname: string;
    
      @ApiProperty({
        name: 'size',
        example: 2,
      })
      @IsInt({
        message: 'size is required',
      })
      size: number;
    
      @ApiProperty({
        name: 'path',
        example: 'abc',
      })
      @IsString({
        message: 'path is required',
      })
      path: string;
    
      @ApiProperty({
        name: 'buffer',
        example: 'abc',
      })
      @IsString({
        message: 'path is required',
      })
      buffer: string;

    @ApiProperty({
        name: 'objectId',
        example: '123-abc'
    })
    objectId: string;

    @ApiProperty({
        name: 'objectType',
        type: 'enum',
        enum: ImageObjectTypeEnum,
        example: ImageObjectTypeEnum.PRODUCT
    })
    objectType: ImageObjectTypeEnum;
}