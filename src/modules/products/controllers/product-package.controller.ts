import { Body, Controller, HttpStatus, Inject,  Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody,ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateProductPackageDTO } from "../dtos/requests/create-product-packge.dto";
import { ProductPackageDTO } from "../dtos/responses/product-package.dto";
import { IProductPackageService } from "../services/product-package.service";

@Controller('/v1/product-package')
@ApiTags('Product')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class ProductPackageController {
  constructor(
    @Inject('IProductPackageService')
    private readonly productPackageService: IProductPackageService,
  ) {}

  @Post('')
  @ApiBody({ type: CreateProductPackageDTO })
  @ApiOkResponse({
    type: ProductPackageDTO,
    description: 'Create product package successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createProduct(
    @Body() body: CreateProductPackageDTO,
  ): Promise<ProductPackageDTO> {
    return this.productPackageService.create(body, 'test');
  }
}
