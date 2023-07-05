
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateAboutCompanyDTO } from "../dtos/requests/create-about-company.dto";
import { UpdateAboutCompanyDTO } from "../dtos/requests/update-about-company.dto";
import { AboutCompanyDTO } from "../dtos/responses/about-company.dto";
import { IAboutCompanyService } from "../services/about-company.service";


@Controller('/v1/about-company')
@ApiTags('AboutCompany')
export class AboutCompanyController {
  constructor(
    @Inject('IAboutCompanyService')
    private readonly aboutCompanyService: IAboutCompanyService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: AboutCompanyDTO,
    isArray: true,
    description: 'Got list aboutCompany successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getAboutCompanyList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<AboutCompanyDTO>> {
    return this.aboutCompanyService.getAll(pageOptionsDTO);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: AboutCompanyDTO,
    description: 'Got aboutCompany successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'AboutCompany with id ... can`t be found'
  })
  getAboutCompany(
    @Param('id') id: string,
  ): Promise<AboutCompanyDTO> {
    return this.aboutCompanyService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateAboutCompanyDTO })
  @ApiOkResponse({
    type: AboutCompanyDTO,
    description: 'Create aboutCompany successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createAboutCompany(
    @Body() body: CreateAboutCompanyDTO,
    @Request() req
  ): Promise<AboutCompanyDTO> {
    return this.aboutCompanyService.create(body, req.user.id);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateAboutCompanyDTO })
  @ApiOkResponse({
    type: AboutCompanyDTO,
    description: 'Update aboutCompany successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'AboutCompany with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN,RoleEnum.EMPLOYEE)
  updateAboutCompany(
    @Param('id') id: string,
    @Body() body: UpdateAboutCompanyDTO,
    @Request() req
  ): Promise<AboutCompanyDTO> {
    return this.aboutCompanyService.update(id, body, req.user.id);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete aboutCompany successfully',
    type: AboutCompanyDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'AboutCompany with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  deleteAboutCompany(
    @Param('id') id: string,
    @Request() req
  ): Promise<AboutCompanyDTO> {
    return this.aboutCompanyService.delete(id, req.user.id);
  }
}
