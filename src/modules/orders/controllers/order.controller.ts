
import { PageDTO } from "@common/dtos/responses/page.dto";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateOrderDTO } from "../dtos/requests/create-order.dto";
import { OrderPageOptionsDTO } from "../dtos/requests/order-page-options.dto";
import { UpdateOrderDTO } from "../dtos/requests/update-order.dto";
import { OrderDTO } from "../dtos/responses/order.dto";
import { IOrderService } from "../services/order.service";


@Controller('/v1/order')
@ApiTags('Order')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
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
  updateOrder(
    @Param('id') id: string,
    @Body() body: UpdateOrderDTO,
  ): Promise<OrderDTO> {
    return this.orderService.update(id, body, 'test');
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete order successfully',
    type: OrderDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'Order with id ... can`t be found'
  })
  deleteOrder(
    @Param('id') id: string,
  ): Promise<OrderDTO> {
    return this.orderService.delete(id, 'test');
  }
}
