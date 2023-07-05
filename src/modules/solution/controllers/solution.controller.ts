
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { AuthGuard } from "@modules/auth/guards/auth.guard";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateSolutionDTO } from "../dtos/requests/create-solution.dto";
import { UpdateSolutionDTO } from "../dtos/requests/update-solution.dto";
import { SolutionDTO } from "../dtos/responses/solution.dto";

import { ISolutionService } from "../services/solution.service";


@Controller('/v1/solution')
@ApiTags('Solution')
export class SolutionController {
  constructor(
    @Inject('ISolutionService')
    private readonly solutionService: ISolutionService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: SolutionDTO,
    isArray: true,
    description: 'Got list solution successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getSolutionList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<SolutionDTO>> {
    return this.solutionService.getAll(pageOptionsDTO);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: SolutionDTO,
    description: 'Got solution successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Solution with id ... can`t be found'
  })
  getSolution(
    @Param('id') id: string,
  ): Promise<SolutionDTO> {
    return this.solutionService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateSolutionDTO })
  @ApiOkResponse({
    type: SolutionDTO,
    description: 'Create solution successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createSolution(
    @Body() body: CreateSolutionDTO,
    @Request() req
    ): Promise<SolutionDTO> {
    return this.solutionService.create(body, req.user.id);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateSolutionDTO })
  @ApiOkResponse({
    type: SolutionDTO,
    description: 'Update solution successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Solution with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  updateSolution(
    @Param('id') id: string,
    @Body() body: UpdateSolutionDTO,
    @Request() req
  ): Promise<SolutionDTO> {
    return this.solutionService.update(id, body, req.user.id);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete solution successfully',
    type: SolutionDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Solution with id ... can`t be found'
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  @UseGuards(AuthGuard, RolesGuard)
  deleteSolution(
    @Param('id') id: string,
    @Request() req
  ): Promise<SolutionDTO> {
    return this.solutionService.delete(id, req.user.id);
  }
}
