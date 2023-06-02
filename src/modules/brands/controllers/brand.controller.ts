
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateBrandDTO } from "../dtos/requests/create-brand.dto";
import { UpdateBrandDTO } from "../dtos/requests/update-brand.dto";
import { BrandDTO } from "../dtos/responses/brand.dto";
import { IBrandService } from "../services/brand.service";


@Controller('/v1/brand')
@ApiTags('Brand')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class BrandController {
  constructor(
    @Inject('IBrandService')
    private readonly brandService: IBrandService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: BrandDTO,
    isArray: true,
    description: 'Got list brand successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getBrandList(
    @Query('queryType') queryType: QueryTypeEnum
  ): Promise<BrandDTO[]> {
    return this.brandService.getAll(queryType);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: BrandDTO,
    description: 'Got brand successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Brand with id ... can`t be found'
  })
  getBrand(
    @Param('id') id: string,
  ): Promise<BrandDTO> {
    return this.brandService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateBrandDTO })
  @ApiOkResponse({
    type: BrandDTO,
    description: 'Create brand successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createBrand(
    @Body() body: CreateBrandDTO,
  ): Promise<BrandDTO> {
    return this.brandService.create(body, 'test');
  }

  @Put('/:id')
  @ApiBody({ type: UpdateBrandDTO })
  @ApiOkResponse({
    type: BrandDTO,
    description: 'Update brand successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Brand with id ... can`t be found'
  })
  updateBrand(
    @Param('id') id: string,
    @Body() body: UpdateBrandDTO,
  ): Promise<BrandDTO> {
    return this.brandService.update(id, body, 'test');
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete brand successfully',
    type: BrandDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Brand with id ... can`t be found'
  })
  deleteBrand(
    @Param('id') id: string,
  ): Promise<BrandDTO> {
    return this.brandService.delete(id, 'test');
  }
}
