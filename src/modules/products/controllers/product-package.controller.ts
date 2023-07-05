import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, HttpStatus, Inject,  Param,  Post, Put, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { ApiBearerAuth, ApiBody,ApiNotFoundResponse,ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateProductPackageDTO } from "../dtos/requests/create-product-packge.dto";
import { ProductPackageDTO } from "../dtos/responses/product-package.dto";
import { IProductPackageService } from "../services/product-package.service";
import { UpdateProductPackageDTO } from "../dtos/requests/update-product-packge.dto";

@Controller('/v1/product-package')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
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
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createProduct(
    @Body() body: CreateProductPackageDTO,
    @Request() req
  ): Promise<ProductPackageDTO> {
    return this.productPackageService.create(body, req.user);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateProductPackageDTO })
  @ApiOkResponse({
    type: ProductPackageDTO,
    description: 'Update productPackage successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'ProductPackage with id ... can`t be found'
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  updateProductPackage(
    @Param('id') id: string,
    @Body() body: UpdateProductPackageDTO,
    @Request() req
  ): Promise<ProductPackageDTO> {
    return this.productPackageService.update(id, body, req.user);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete productPackage successfully',
    type: ProductPackageDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'ProductPackage with id ... can`t be found'
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  deleteProductPackage(
    @Param('id') id: string,
    @Request() req
  ): Promise<ProductPackageDTO> {
    return this.productPackageService.delete(id, req.user);
  }
}
