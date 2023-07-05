
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateBannerDTO } from "../dtos/requests/create-banner.dto";
import { BannerDTO } from "../dtos/responses/banner.dto";
import { IBannerService } from "../services/banner.service";
import { UpdateBannerDTO } from "../dtos/requests/update-banner.dto";


@Controller('/v1/banner')
@ApiTags('Banner')
export class BannerController {
  constructor(
    @Inject('IBannerService')
    private readonly bannerService: IBannerService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: BannerDTO,
    isArray: true,
    description: 'Got list banner successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getBannerList(
  ): Promise<BannerDTO[]> {
    return this.bannerService.getAll();
  }


  @Post('')
  @ApiBody({ type: CreateBannerDTO })
  @ApiOkResponse({
    type: BannerDTO,
    description: 'Create banner successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createBanner(
    @Body() body: CreateBannerDTO,
    @Request() req
  ): Promise<BannerDTO> {
    return this.bannerService.create(body, req.user.id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateBannerDTO })
  @ApiOkResponse({
    type: BannerDTO,
    description: 'Update banner successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Banner with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  updateBanner(
    @Param('id') id: string,
    @Body() body: UpdateBannerDTO,
    @Request() req
  ): Promise<BannerDTO> {
    return this.bannerService.update(id, body, req.user.id);
  }
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete banner successfully',
    type: BannerDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Banner with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  deleteBanner(
    @Param('id') id: string,
    @Request() req
  ): Promise<BannerDTO> {
    return this.bannerService.delete(id, req.user.id);
  }
}
