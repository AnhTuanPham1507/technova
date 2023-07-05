import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateCategoryDTO } from "../dtos/requests/create-category.dto";
import { UpdateCategoryDTO } from "../dtos/requests/update-category.dto";
import { CategoryDTO } from "../dtos/responses/category.dto";
import { ICategoryService } from "../services/category.service";


@Controller('/v1/category')
@ApiTags('Category')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: CategoryDTO,
    isArray: true,
    description: 'Got list category successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getCategoryList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<CategoryDTO>> {
    return this.categoryService.getAll(pageOptionsDTO);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: CategoryDTO,
    description: 'Got category successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Category with id ... can`t be found'
  })
  getCategory(
    @Param('id') id: string,
  ): Promise<CategoryDTO> {
    return this.categoryService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateCategoryDTO })
  @ApiOkResponse({
    type: CategoryDTO,
    description: 'Create category successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN,RoleEnum.EMPLOYEE)
  createCategory(
    @Body() body: CreateCategoryDTO,
    @Request() req
  ): Promise<CategoryDTO> {
    return this.categoryService.create(body, req.user.id);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateCategoryDTO })
  @ApiOkResponse({
    type: CategoryDTO,
    description: 'Update category successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Category with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDTO,
    @Request() req
  ): Promise<CategoryDTO> {
    return this.categoryService.update(id, body, req.user.id);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete category successfully',
    type: CategoryDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Category with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  deleteCategory(
    @Param('id') id: string,
    @Request() req
  ): Promise<CategoryDTO> {
    return this.categoryService.delete(id, req.user.id);
  }
}
