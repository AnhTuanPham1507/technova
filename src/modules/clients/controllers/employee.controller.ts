

import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { AuthGuard } from "@modules/auth/guards/auth.guard";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateEmployeeDTO } from "../dtos/requests/create-employee.dto";
import { UpdateEmployeeDTO } from "../dtos/requests/update-employee.dto";
import { EmployeeDTO } from "../dtos/responses/employee.dto";
import { IEmployeeService } from "../services/employee.service";


@Controller('/v1/employee')
@ApiTags('Employee')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.USER)
export class EmployeeController {
  constructor(
    @Inject('IEmployeeService')
    private readonly employeeService: IEmployeeService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: EmployeeDTO,
    isArray: true,
    description: 'Got list employee successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getEmployeeList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<EmployeeDTO>> {
    return this.employeeService.getAll(pageOptionsDTO);
  }

  @Get('/info')
  @ApiOkResponse({
    type: EmployeeDTO,
    description: 'Got employee successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Employee with id ... can`t be found'
  })
  getEmployee(
    @Request() req,
  ): Promise<EmployeeDTO> {
    return this.employeeService.getByAccountId(req.employee.id);
  }

  @Post('')
  @ApiBody({ type: CreateEmployeeDTO })
  @ApiOkResponse({
    type: EmployeeDTO,
    description: 'Create employee successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createEmployee(
    @Body() body: CreateEmployeeDTO,
  ): Promise<EmployeeDTO> {
    return this.employeeService.create(body);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateEmployeeDTO })
  @ApiOkResponse({
    type: EmployeeDTO,
    description: 'Update employee successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Employee with id ... can`t be found'
  })
  updateEmployee(
    @Param('id') id: string,
    @Body() body: UpdateEmployeeDTO,
  ): Promise<EmployeeDTO> {
    return this.employeeService.update(id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete employee successfully',
    type: EmployeeDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Employee with id ... can`t be found'
  })
  deleteEmployee(
    @Param('id') id: string,
  ): Promise<EmployeeDTO> {
    return this.employeeService.delete(id, 'test');
  }
}
