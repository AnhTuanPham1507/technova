import { Body, Controller, Delete, HttpStatus, Inject,  Param,  Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody,ApiNotFoundResponse,ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProductBenefitDTO } from "../dtos/responses/product-benefit.dto";
import { IProductBenefitService } from "../services/product-benefit.service";
import { CreateProductBenefitDTO } from "../dtos/requests/create-product-benefit.dto";
import { UpdateProductBenefitDTO } from "../dtos/requests/create-benefit-value.dto";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Roles } from "@decorators/role.decorator";
import { RoleEnum } from "@constants/enums/role.enum";

@Controller('/v1/product-benefit')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
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
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createProduct(
    @Body() body: CreateProductBenefitDTO,
    @Request() req
  ): Promise<ProductBenefitDTO> {
    return this.productBenefitService.create(body, req.user);
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
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  updateProductBenefit(
    @Param('id') id: string,
    @Body() body: UpdateProductBenefitDTO,
    @Request() req
  ): Promise<ProductBenefitDTO> {
    return this.productBenefitService.update(id, body, req.user);
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
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  deleteProductBenefit(
    @Param('id') id: string,
    @Request() req
  ): Promise<ProductBenefitDTO> {
    return this.productBenefitService.delete(id, req.user);
  }
}
