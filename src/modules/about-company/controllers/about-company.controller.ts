
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateAboutCompanyDTO } from "../dtos/requests/create-about-company.dto";
import { UpdateAboutCompanyDTO } from "../dtos/requests/update-about-company.dto";
import { AboutCompanyDTO } from "../dtos/responses/about-company.dto";
import { IAboutCompanyService } from "../services/about-company.service";


@Controller('/v1/about-company')
@ApiTags('AboutCompany')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
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
  createAboutCompany(
    @Body() body: CreateAboutCompanyDTO,
  ): Promise<AboutCompanyDTO> {
    return this.aboutCompanyService.create(body, 'test');
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
  updateAboutCompany(
    @Param('id') id: string,
    @Body() body: UpdateAboutCompanyDTO,
  ): Promise<AboutCompanyDTO> {
    return this.aboutCompanyService.update(id, body, 'test');
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
  deleteAboutCompany(
    @Param('id') id: string,
  ): Promise<AboutCompanyDTO> {
    return this.aboutCompanyService.delete(id, 'test');
  }
}
