import { Body, Controller, HttpStatus, Inject,  Param,  Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody,ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UpdateBenefitValueDTO } from "../dtos/requests/update-benefit-value.dto";
import { BenefitValueDTO } from "../dtos/responses/benefit-value.dto";
import { IBenefitValueService } from "../services/benefit-value.service";


@Controller('/v1/benefit-value')
@ApiTags('Product')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
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
  createProduct(
    @Param('id') id: string,
    @Body() body: UpdateBenefitValueDTO,
  ): Promise<BenefitValueDTO> {
    return this.benefitValueService.update(id, body, 'test');
  }
}
