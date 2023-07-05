import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { EmployeeEntity } from "@modules/clients/database/entities/employee.entity";
import { IEmployeeService } from "@modules/clients/services/employee.service";
import { IUserService } from "@modules/clients/services/user.service";
import { IProductPackageService } from "@modules/products/services/product-package.service";
import {  Inject, Injectable } from "@nestjs/common";
import { PaymentEntity } from "../database/entities/payment.entity";
import { IOrderRepository } from "../database/repositories/order.repository";
import { IPaymentRepository } from "../database/repositories/payment.repository";
import { CreatePaymentDTO } from "../dtos/requests/create-payment.dto";
import { PaymentDTO } from "../dtos/responses/payment.dto";


export interface IPaymentService {
    create(createPayment: CreatePaymentDTO, account: AccountDTO): Promise<PaymentDTO> ;
}

@Injectable()
export class PaymentService implements IPaymentService {
    constructor(
        @Inject('IPaymentRepository')
        private readonly paymentRepo: IPaymentRepository,
        @Inject('IOrderRepository')
        private readonly orderRepo: IOrderRepository
    ){}
    
    async create(createPayment: CreatePaymentDTO, account: AccountDTO): Promise<PaymentDTO>{
        const order = await this.orderRepo.getById(createPayment.orderId);
        const payment = new PaymentEntity();
        payment.momoId = createPayment.momoId;
        payment.order = order;
        payment.createdBy = account.id;
        payment.updatedBy = account.id;

        const createdPayment = await this.paymentRepo.save(payment);
        return new PaymentDTO(createdPayment);
    } 
}