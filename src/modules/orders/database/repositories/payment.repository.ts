import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaymentEntity } from "../entities/payment.entity";

export interface IPaymentRepository {
  save(payment: PaymentEntity): Promise<PaymentEntity>;
}

@Injectable()
export class PaymentRepository implements IPaymentRepository {
    
    constructor(
        @InjectRepository(PaymentEntity)
        private paymentRepo: Repository<PaymentEntity>,
    ){}

    save(payment: PaymentEntity): Promise<PaymentEntity> {
        return this.paymentRepo.save(payment);
    }

}