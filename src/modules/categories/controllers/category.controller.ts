import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateCategoryDTO } from "../dtos/requests/create-category.dto";
import { UpdateCategoryDTO } from "../dtos/requests/update-category.dto";
import { CategoryDTO } from "../dtos/responses/category.dto";
import { ICategoryService } from "../services/category.service";


@Controller('/v1/category')
@ApiTags('Category')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
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
    @Query('queryType') queryType: QueryTypeEnum
  ): Promise<CategoryDTO[]> {
    return this.categoryService.getAll(queryType);
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
  createCategory(
    @Body() body: CreateCategoryDTO,
  ): Promise<CategoryDTO> {
    return this.categoryService.create(body, 'test');
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
  updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDTO,
  ): Promise<CategoryDTO> {
    return this.categoryService.update(id, body, 'test');
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
  deleteCategory(
    @Param('id') id: string,
  ): Promise<CategoryDTO> {
    return this.categoryService.delete(id, 'test');
  }
}
