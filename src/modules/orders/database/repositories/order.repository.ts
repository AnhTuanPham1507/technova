import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { OrderPageOptionsDTO } from "@modules/orders/dtos/requests/order-page-options.dto";
import { OrderDetailDTO } from "@modules/orders/dtos/responses/order-detail.dto";
import { OrderDTO } from "@modules/orders/dtos/responses/order.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";

export interface IOrderRepository {
  getById(id: string): Promise<OrderEntity>;
  save(order: OrderEntity): Promise<OrderEntity>;
  getAll(pageOptionsDTO: OrderPageOptionsDTO): Promise<PageDTO<OrderDTO>>;
  getAllByRangeTime(startTime: Date, endTime: Date): Promise<OrderEntity[]>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
    
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>,
    ){}

    async getById(id: string): Promise<OrderEntity>{
      const order = await this.orderRepo.findOne({
        where: {
          id
        },
        relations: ['details']
      }) 

      if(!order){
        throw new NotFoundException(`Order with id ${id} can't be found`);
      }

      return order;
    }

    save(order: OrderEntity): Promise<OrderEntity> {
        return this.orderRepo.save(order);
    }

    async getAll(pageOptionsDTO: OrderPageOptionsDTO): Promise<PageDTO<OrderDTO>> {
        const query = this.orderRepo.createQueryBuilder('order');
        query.leftJoinAndSelect('order.details', 'details')
        query.withDeleted();
    
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(order.customerName ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
          });
        }

        if (pageOptionsDTO.email) {
          query.andWhere('(order.email ILIKE :q)', {
            q: `%${pageOptionsDTO.email}%`,
          });
        }

        if (pageOptionsDTO.startDate) {
          query.andWhere('(order.createdAt > :startDate)', {
            startDate: pageOptionsDTO.startDate,
          });
        }

        if (pageOptionsDTO.endDate) {
          query.andWhere('(order.createdAt < :endDate)', {
            endDate: pageOptionsDTO.endDate,
          });
        }

        if (pageOptionsDTO.status) {
          query.andWhere('(order.status = :status)', {
            status: pageOptionsDTO.status,
          });
        }

        if (pageOptionsDTO.isPaid !== null && pageOptionsDTO.isPaid !== undefined) {
          query.andWhere('(order.isPaid = :isPaid)', {
            isPaid: pageOptionsDTO.isPaid,
          });
        }

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('order.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('order.deleted_at is not null');
            break;
        }
        
        query.orderBy(`order.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
        const ordersDTO = result.map((it) => {
          const detailsDTO = it.details.map(detail => new OrderDetailDTO(detail))
          return new OrderDTO(it, detailsDTO);
        });
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<OrderDTO>(ordersDTO, pageMetaDto);
    }

    getAllByRangeTime(startTime: Date, endTime: Date): Promise<OrderEntity[]>{
      const query = this.orderRepo.createQueryBuilder('order');

      query.where('order.createdAt > :startTime', {
        startTime
      })
      query.andWhere('order.createdAt < :endTime', {
        endTime
      })
      query.andWhere('order.status = :status',{
        status: OrderStatusEnum.success
      })

      return query.getMany();
    }
}