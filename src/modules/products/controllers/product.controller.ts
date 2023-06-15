import { PageDTO } from "@common/dtos/responses/page.dto";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProductDTO } from "../dtos/responses/product.dto";
import { IProductService } from "../services/product.service";
import { CreateProductDTO } from "../dtos/requests/create-product.dto";
import { UpdateProductDTO } from "../dtos/requests/update-product.dto";
import { ProductBenefitDTO } from "../dtos/responses/product-benefit.dto";
import { IProductBenefitService } from "../services/product-benefit.service";
import { IProductPackageService } from "../services/product-package.service";
import { ProductPackageDTO } from "../dtos/responses/product-package.dto";
import { ProductPageOptionsDTO } from "../dtos/requests/product-page-option.dto";

@Controller('/v1/product')
@ApiTags('Product')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
    @Inject('IProductBenefitService')
    private readonly productBenefitService: IProductBenefitService,
    @Inject('IProductPackageService')
    private readonly productPackageService: IProductPackageService,
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
    @Query() pageOptions: ProductPageOptionsDTO
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

  @Get('/:id/benefit')
  @ApiOkResponse({
    type: ProductBenefitDTO,
    isArray: true,
    description: 'Got product benefits successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Product with id ... can`t be found'
  })
  getProductBenefits(
    @Param('id') id: string,
  ): Promise<ProductBenefitDTO[]> {
    return this.productBenefitService.getByProductId(id);
  }

  @Get('/:id/package')
  @ApiOkResponse({
    type: ProductPackageDTO,
    isArray: true,
    description: 'Got product benefits successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Product with id ... can`t be found'
  })
  getProductPackages(
    @Param('id') id: string,
  ): Promise<ProductPackageDTO[]> {
    return this.productPackageService.getByProductId(id);
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
