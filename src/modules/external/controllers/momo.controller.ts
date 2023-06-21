import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { NotificationMoMoDTO } from '../dtos/requests/notification-momo.dto';
import { RequestPaymentDTO } from '../dtos/requests/request-payment.dto';
import { ResponseMoMoDTO } from '../dtos/responses/response-momo.dto';
import { IMoMoService } from '../services/momo/momo.service';


@Controller('/v1/momo')
@ApiTags('MoMo')
export class MoMoController {
  constructor(
    @Inject('IMoMoService')
    private momoService: IMoMoService,

  ) {}

  @Post('/notify')
  @ApiOkResponse({
    description: 'Got payment notification',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  async getPaymentNotification(
    @Res() res: Response,
    @Body() payload: NotificationMoMoDTO,
  ): Promise<void> {
    await this.momoService.handleResultPayment(payload);
    res.status(HttpStatus.NO_CONTENT);
  }

  @Post('/')
  async request(
    @Body() payload: RequestPaymentDTO,
  ): Promise<ResponseMoMoDTO> {
    return this.momoService.requestPayment(payload);
  }

}
