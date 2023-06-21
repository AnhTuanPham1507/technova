
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import {  Controller, Get, HttpStatus, Inject,  Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth,  ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { IOrderService } from "../services/order.service";


@Controller('/v1/statistic')
@ApiTags('Statistic')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Roles(RoleEnum.ADMIN)
export class StatictisController {
  constructor(
    @Inject('IOrderService')
    private readonly orderService: IOrderService,
  ) {}

  @Get('')
  @ApiOkResponse({
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  statistic(
  ): Promise<any> {
    return this.orderService.statistic();
  }
}
