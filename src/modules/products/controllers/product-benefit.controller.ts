import { Body, Controller, Delete, HttpStatus, Inject,  Param,  Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody,ApiNotFoundResponse,ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProductBenefitDTO } from "../dtos/responses/product-benefit.dto";
import { IProductBenefitService } from "../services/product-benefit.service";
import { CreateProductBenefitDTO } from "../dtos/requests/create-product-benefit.dto";
import { UpdateProductBenefitDTO } from "../dtos/requests/create-benefit-value.dto";

@Controller('/v1/product-benefit')
@ApiTags('Product')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class ProductBenefitController {
  constructor(
    @Inject('IProductBenefitService')
    private readonly productBenefitService: IProductBenefitService,
  ) {}

  @Post('')
  @ApiBody({ type: CreateProductBenefitDTO })
  @ApiOkResponse({
    type: ProductBenefitDTO,
    description: 'Create product benefit successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createProduct(
    @Body() body: CreateProductBenefitDTO,
  ): Promise<ProductBenefitDTO> {
    return this.productBenefitService.create(body, 'test');
  }

  @Put('/:id')
  @ApiBody({ type: UpdateProductBenefitDTO })
  @ApiOkResponse({
    type: ProductBenefitDTO,
    description: 'Update productPackage successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'ProductBenefit with id ... can`t be found'
  })
  updateProductBenefit(
    @Param('id') id: string,
    @Body() body: UpdateProductBenefitDTO,
  ): Promise<ProductBenefitDTO> {
    return this.productBenefitService.update(id, body, 'test');
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete productPackage successfully',
    type: ProductBenefitDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'ProductBenefit with id ... can`t be found'
  })
  deleteProductBenefit(
    @Param('id') id: string,
  ): Promise<ProductBenefitDTO> {
    return this.productBenefitService.delete(id, 'test');
  }
}
