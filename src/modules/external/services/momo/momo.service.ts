import { EnvConfigService } from '@modules/shared/services/api-config.service';
import { HttpService } from '@modules/shared/services/http.service';
import { Inject, Injectable } from '@nestjs/common';

import { BaseMoMoService } from './base-momo.service';
import { ResponseMoMoDTO } from '@modules/external/dtos/responses/response-momo.dto';
import { RequestPaymentDTO } from '@modules/external/dtos/requests/request-payment.dto';
import { MomoEndPoint } from '@constants/enums/momo-endpoint.enum';
import { NotificationMoMoDTO } from '@modules/external/dtos/requests/notification-momo.dto';
import { IOrderService } from '@modules/orders/services/order.service';
import {createHmac} from 'crypto';
import { UpdateOrderDTO } from '@modules/orders/dtos/requests/update-order.dto';
import { CreatePaymentDTO } from '@modules/orders/dtos/requests/create-payment.dto';
import { IPaymentService } from '@modules/orders/services/payment.service';
import { AccountDTO } from '@modules/auth/dtos/responses/account.dto';
import { IAuthService } from '@modules/auth/services/auth.service';

export interface IMoMoService {
  requestPayment(
    momoBody: RequestPaymentDTO
  ): Promise<ResponseMoMoDTO>;
  handleResultPayment(payload: NotificationMoMoDTO): Promise<void>;
}

@Injectable()
export class MoMoService implements IMoMoService {
  constructor(
    private readonly configService: EnvConfigService,
    private readonly httpService: HttpService,
    @Inject('IOrderService')
    private readonly orderService: IOrderService,
    @Inject('IPaymentService')
    private readonly paymentService: IPaymentService,
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {
  }

  async requestPayment(
    momoBody: RequestPaymentDTO
  ): Promise<ResponseMoMoDTO> {
    const {amount, extraData, orderId, orderInfo, requestId} = momoBody;
    const endPoint = MomoEndPoint.REQUEST_PAYMENT;
    const method = 'POST';
    const { domain, ipnUrl, secretKey, partnerCode, accessKey, redirectUrl } = this.configService.momoConfig;
    const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + "abc" +"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + "captureWallet"
    //puts raw signature

    //signature
    const signature = createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');


    const payload = {
      partnerCode : partnerCode,
      accessKey : accessKey,
      requestId : requestId,
      amount : amount,
      orderId : orderId,
      orderInfo : orderInfo,
      redirectUrl : redirectUrl,
      ipnUrl : ipnUrl,
      extraData : "abc",
      requestType : "captureWallet",
      signature : signature,
      lang: 'vi'
    };

    const publishEventService = new BaseMoMoService<ResponseMoMoDTO>(
      domain,
      endPoint,
      method,
      ResponseMoMoDTO,
      payload
    );
    const res = await  this.httpService.call<ResponseMoMoDTO>(publishEventService);
    return res;
  }

  async handleResultPayment(payload: NotificationMoMoDTO): Promise<void>{
    const adminAccount = await this.authService.getAdminAccount();
    const {amount, extraData, orderId, orderInfo, requestId, orderType, transId, resultCode, message, payType, responseTime, signature} = payload;
    const { secretKey, partnerCode, accessKey } = this.configService.momoConfig;
    const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+ "&message="+ message +"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&orderType="+orderType+"&partnerCode=" + partnerCode +"&payType=" + payType+"&requestId=" + requestId+"&responseTime="+responseTime+"&resultCode=" + resultCode+"&transId="+transId
    //puts raw signature
    //signature
    const mySignature = createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    if(signature === mySignature && resultCode === 0){
      const updateOrderData = new UpdateOrderDTO();
      updateOrderData.isPaid = true;
      await this.orderService.update(orderId, updateOrderData, adminAccount);

      const payment = new CreatePaymentDTO();
      payment.momoId = transId;
      payment.orderId = orderId;
      await this.paymentService.create(payment, adminAccount);
    }
  }
}
