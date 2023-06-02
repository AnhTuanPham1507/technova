import { PageDTO } from "@common/dtos/responses/page.dto";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProductDTO } from "../dtos/responses/product.dto";
import { IProductService } from "../services/product.service";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { CreateProductDTO } from "../dtos/requests/create-product.dto";
import { UpdateProductDTO } from "../dtos/requests/update-product.dto";

@Controller('/v1/product')
@ApiTags('Product')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: PageDTO<ProductDTO>,
    description: 'Got list product successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getProductList(
    @Query() pageOptions: PageOptionsDTO
  ): Promise<PageDTO<ProductDTO>> {
    return this.productService.getAll(pageOptions);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: ProductDTO,
    description: 'Got product successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Product with id ... can`t be found'
  })
  getProduct(
    @Param('id') id: string,
  ): Promise<ProductDTO> {
    return this.productService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateProductDTO })
  @ApiOkResponse({
    type: ProductDTO,
    description: 'Create product successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createProduct(
    @Body() body: CreateProductDTO,
  ): Promise<ProductDTO> {
    return this.productService.create(body, 'test');
  }

  @Put('/:id')
  @ApiBody({ type: UpdateProductDTO })
  @ApiOkResponse({
    type: ProductDTO,
    description: 'Update product successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Product with id ... can`t be found'
  })
  updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDTO,
  ): Promise<ProductDTO> {
    return this.productService.update(id, body, 'test');
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete product successfully',
    type: ProductDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Product with id ... can`t be found'
  })
  deleteProduct(
    @Param('id') id: string,
  ): Promise<ProductDTO> {
    return this.productService.delete(id, 'test');
  }
}
