import { imageFileFilter } from '@/utils/check-filetype';
import { RoleEnum } from '@constants/enums/role.enum';
import { Roles } from '@decorators/role.decorator';
import { RolesGuard } from '@modules/auth/guards/role.guard';
import {
    Body,
    Controller,
    Delete,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
import { AuthGuard } from "@modules/auth/guards/auth.guard";
import {  FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateImageDTO } from '../dtos/requests/create-image.dto';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';
import { ImageDTO } from '../dtos/responses/image.dto';
import { IImageService } from '../services/image.service';
  
@Controller('/v1/image')
@ApiTags('Image')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
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
    @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
    createImages(
        @UploadedFiles() files: CreateImageDTO[],
        @Request() req
    ): Promise<ImageDTO[]> {
        return this.imageService.create(files, req.user.id);
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
    @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
    updateImages(
        @Body() updateImageDTO: UpdateImageDTO,
        @Request() req
    ): Promise<ImageDTO[]> {
        return this.imageService.update(updateImageDTO, req.user.id);
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
    @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
    deleteImage(
        @Param('id') id: string,
    ): Promise<void> {
        return this.imageService.delete(id);
    }
}