
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateBrandDTO } from "../dtos/requests/create-brand.dto";
import { UpdateBrandDTO } from "../dtos/requests/update-brand.dto";
import { BrandDTO } from "../dtos/responses/brand.dto";
import { IBrandService } from "../services/brand.service";


@Controller('/v1/brand')
@ApiTags('Brand')
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
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<BrandDTO>> {
    return this.brandService.getAll(pageOptionsDTO);
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createBrand(
    @Body() body: CreateBrandDTO,
    @Request() req
  ): Promise<BrandDTO> {
    return this.brandService.create(body, req.user.id);
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  updateBrand(
    @Param('id') id: string,
    @Body() body: UpdateBrandDTO,
    @Request() req
  ): Promise<BrandDTO> {
    return this.brandService.update(id, body, req.user.id);
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  deleteBrand(
    @Param('id') id: string,
    @Request() req
  ): Promise<BrandDTO> {
    return this.brandService.delete(id, req.user.id);
  }
}
