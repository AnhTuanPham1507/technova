import { imageFileFilter } from '@/utils/check-filetype';
import { ImageObjectTypeEnum } from '@constants/enums/image-object-type.enum';
import {
    Body,
    Controller,
    HttpStatus,
    Inject,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ImageDTO } from '../dtos/responses/image.dto';
import { ICloudinaryService } from '../services/cloudinary.service';
  
@Controller('image')
@ApiTags('Brand')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class ImageController {
    constructor(
        @Inject('ICloudinaryService')
        private readonly cloudinaryService: ICloudinaryService
    ) {}
  
    // @Post('')
    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //     schema: {
    //         type: 'object',
    //         properties: { 
    //             images: { 
    //                 type: 'string', 
    //                 format: 'binary' 
    //             },
    //             objectId: {
    //                 type: 'string'
    //             },
    //             objectType: {
    //                 type: 'enum',
    //             }
    //         },
    //     },
    // })
    // @ApiOkResponse({
    //     type: ImageDTO,
    //     description: 'Upload image successfully',
    // })
    // @ApiUnauthorizedResponse()
    // @ApiResponse({
    //     status: HttpStatus.INTERNAL_SERVER_ERROR,
    //     description: 'Internal server errors.',
    // })
    // @UseInterceptors(
    //     FilesInterceptor('images', 20, {
    //       // limits: {
    //       //   fileSize: ONE_MB * 5, // 5 MB
    //       // },
    //       fileFilter: imageFileFilter,
    //     }),
    // )
    // uploadFiles(
    //     @UploadedFiles() files: Express.Multer.File,
    // ): Promise<ImageDTO[]> {
    //     return this.cloudinaryService.uploadFiles(files, 'test');
    // }
}