
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { AuthGuard } from "@modules/auth/guards/auth.guard";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateOrderDTO } from "../dtos/requests/create-order.dto";
import { OrderPageOptionsDTO } from "../dtos/requests/order-page-options.dto";
import { UpdateOrderDTO } from "../dtos/requests/update-order.dto";
import { OrderDTO } from "../dtos/responses/order.dto";
import { IOrderService } from "../services/order.service";


@Controller('/v1/order')
@ApiTags('Order')
@ApiBearerAuth()
export class OrderController {
  constructor(
    @Inject('IOrderService')
    private readonly orderService: IOrderService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: OrderDTO,
    isArray: true,
    description: 'Got list order successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  getOrderList(
    @Query() pageOptionsDTO: OrderPageOptionsDTO
  ): Promise<PageDTO<OrderDTO>> {
    return this.orderService.getAll(pageOptionsDTO);
  }

  @Get('/by-owner')
  @ApiOkResponse({
    type: OrderDTO,
    isArray: true,
    description: 'Got list order successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE, RoleEnum.USER)
  getOrderListOfUser(
    @Query() pageOptionsDTO: OrderPageOptionsDTO,
    @Request() req
  ): Promise<PageDTO<OrderDTO>> {
    pageOptionsDTO.email = req.user.email;
    return this.orderService.getAll(pageOptionsDTO);
  }


  @Post('')
  @ApiBody({ type: CreateOrderDTO })
  @ApiOkResponse({
    type: OrderDTO,
    description: 'Create order successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE, RoleEnum.USER)
  createOrder(
    @Body() body: CreateOrderDTO,
  ): Promise<OrderDTO> {
    return this.orderService.create(body,{} as AccountDTO);
  }

  @Put('/:id')
  @ApiBody({ type: UpdateOrderDTO })
  @ApiOkResponse({
    type: OrderDTO,
    description: 'Update order successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Order with id ... can`t be found'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  updateOrder(
    @Param('id') id: string,
    @Body() body: UpdateOrderDTO,
    @Request() req
  ): Promise<OrderDTO> {
    return this.orderService.update(id, body, req.user);
  }
}
