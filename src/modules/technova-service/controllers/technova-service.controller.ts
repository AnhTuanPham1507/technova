
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateTechnovaServiceDTO } from "../dtos/requests/create-technova-service.dto";
import { UpdateTechnovaServiceDTO } from "../dtos/requests/update-technova-service.dto";
import { TechnovaServiceDTO } from "../dtos/responses/technova-service.dto";
import { ITechnovaServiceService } from "../services/technova-service.service";


@Controller('/v1/technova-service')
@ApiTags('TechnovaService')
export class TechnovaServiceController {
  constructor(
    @Inject('ITechnovaServiceService')
    private readonly technovaServiceService: ITechnovaServiceService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: TechnovaServiceDTO,
    isArray: true,
    description: 'Got list technovaService successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getTechnovaServiceList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<TechnovaServiceDTO>> {
    return this.technovaServiceService.getAll(pageOptionsDTO);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: TechnovaServiceDTO,
    description: 'Got technovaService successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'TechnovaService with id ... can`t be found'
  })
  getTechnovaService(
    @Param('id') id: string,
  ): Promise<TechnovaServiceDTO> {
    return this.technovaServiceService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateTechnovaServiceDTO })
  @ApiOkResponse({
    type: TechnovaServiceDTO,
    description: 'Create technovaService successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createTechnovaService(
    @Body() body: CreateTechnovaServiceDTO,
    @Request() req
  ): Promise<TechnovaServiceDTO> {
    return this.technovaServiceService.create(body, req.user.id);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateTechnovaServiceDTO })
  @ApiOkResponse({
    type: TechnovaServiceDTO,
    description: 'Update technovaService successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'TechnovaService with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN,RoleEnum.EMPLOYEE)
  updateTechnovaService(
    @Param('id') id: string,
    @Body() body: UpdateTechnovaServiceDTO,
    @Request() req
  ): Promise<TechnovaServiceDTO> {
    return this.technovaServiceService.update(id, body, req.user.id);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete technovaService successfully',
    type: TechnovaServiceDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'TechnovaService with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  deleteTechnovaService(
    @Param('id') id: string,
    @Request() req
  ): Promise<TechnovaServiceDTO> {
    return this.technovaServiceService.delete(id, req.user.id);
  }
}
