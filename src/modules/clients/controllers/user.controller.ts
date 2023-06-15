

import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateUserDTO } from "../dtos/requests/create-user.dto";
import { UpdateUserDTO } from "../dtos/requests/update-user.dto";
import { UserDTO } from "../dtos/responses/user.dto";
import { IUserService } from "../services/user.service";


@Controller('/v1/user')
@ApiTags('User')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: UserDTO,
    isArray: true,
    description: 'Got list user successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getUserList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<UserDTO>> {
    return this.userService.getAll(pageOptionsDTO);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: UserDTO,
    description: 'Got user successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'User with id ... can`t be found'
  })
  getUser(
    @Param('id') id: string,
  ): Promise<UserDTO> {
    return this.userService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateUserDTO })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Create user successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createUser(
    @Body() body: CreateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.create(body);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Update user successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'User with id ... can`t be found'
  })
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete user successfully',
    type: UserDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'User with id ... can`t be found'
  })
  deleteUser(
    @Param('id') id: string,
  ): Promise<UserDTO> {
    return this.userService.delete(id, 'test');
  }
}