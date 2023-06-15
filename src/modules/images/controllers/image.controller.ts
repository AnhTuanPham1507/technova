import { imageFileFilter } from '@/utils/check-filetype';
import {
    Body,
    Controller,
    Delete,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateImageDTO } from '../dtos/requests/create-image.dto';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';
import { ImageDTO } from '../dtos/responses/image.dto';
import { IImageService } from '../services/image.service';
  
@Controller('/v1/image')
@ApiTags('Image')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class ImageController {
    constructor(
        @Inject('IImageService')
        private readonly imageService: IImageService
    ) {}
  
    @Post('')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: { 
                files: {   
                    type: 'string', 
                    format: 'binary'
                },
            },
        },
    })
    @ApiOkResponse({
        type: ImageDTO,
        isArray: true,
        description: 'Create images successfully',
    })
    @ApiUnauthorizedResponse()
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    })
    @UseInterceptors(
        FilesInterceptor('files', 20, {
          // limits: {
          //   fileSize: ONE_MB * 5, // 5 MB
          // },
          fileFilter: imageFileFilter,
        }),
    )
    createImages(
        @UploadedFiles() files: CreateImageDTO[],
    ): Promise<ImageDTO[]> {
        console.log(files)
        return this.imageService.create(files, 'test');
    }

    @Put('')
    @ApiOkResponse({
        type: ImageDTO,
        isArray: true,
        description: 'Update images successfully',
    })
    @ApiUnauthorizedResponse()
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    })
    updateImages(
        @Body() updateImageDTO: UpdateImageDTO,
    ): Promise<ImageDTO[]> {
        return this.imageService.update(updateImageDTO, 'test');
    }

    @Delete('/:id')
    @ApiOkResponse({
        description: 'Delete images successfully',
    })
    @ApiUnauthorizedResponse()
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    })
    deleteImage(
        @Param('id') id: string,
    ): Promise<void> {
        return this.imageService.delete(id);
    }
}