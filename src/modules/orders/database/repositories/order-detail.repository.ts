import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderDetailEntity } from "../entities/order-detail.entity";

export interface IOrderDetailRepository {
  getByOrderId(orderId: string): Promise<OrderDetailEntity[]>;
  save(orderDetail: OrderDetailEntity): Promise<OrderDetailEntity>;
}

@Injectable()
export class OrderDetailRepository implements IOrderDetailRepository {
    
    constructor(
        @InjectRepository(OrderDetailEntity)
        private orderDetailRepo: Repository<OrderDetailEntity>,
    ){}

    save(orderDetail: OrderDetailEntity): Promise<OrderDetailEntity> {
        return this.orderDetailRepo.save(orderDetail);
    }

    getByOrderId(orderId: string): Promise<OrderDetailEntity[]>{
      return this.orderDetailRepo.find({
        where: {
          order: {
            id: orderId
          }
        }
      })
    }

}