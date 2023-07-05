import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, HttpStatus, Inject,  Param,  Post, Put, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/guards/auth.guard";

import { ApiBearerAuth, ApiBody,ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UpdateBenefitValueDTO } from "../dtos/requests/update-benefit-value.dto";
import { BenefitValueDTO } from "../dtos/responses/benefit-value.dto";
import { IBenefitValueService } from "../services/benefit-value.service";


@Controller('/v1/benefit-value')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class BenefitValueController {
  constructor(
    @Inject('IBenefitValueService')
    private readonly benefitValueService: IBenefitValueService,
  ) {}

  @Put(':id')
  @ApiBody({ type: UpdateBenefitValueDTO })
  @ApiOkResponse({
    type: BenefitValueDTO,
    description: 'Update benefit value successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  createProduct(
    @Param('id') id: string,
    @Body() body: UpdateBenefitValueDTO,
    @Request() req
  ): Promise<BenefitValueDTO> {
    return this.benefitValueService.update(id, body, req.user.id);
  }
}
