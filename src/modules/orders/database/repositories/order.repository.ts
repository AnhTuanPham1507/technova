import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { OrderDTO } from "@modules/orders/dtos/responses/order.dto";
import { ProductDTO } from "@modules/products/dtos/responses/product.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";

export interface IOrderRepository {
    getById(id: string): Promise<OrderEntity> ;
    save(order: OrderEntity): Promise<OrderEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<OrderDTO>>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
    
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>,
    ){}

    async getById(id: string): Promise<OrderEntity> {
        const order = await this.orderRepo.findOne({
            where: {
                id
            }
        })

        if(!order){
            throw new NotFoundException(`Order with id ${id} not found`)
        }

        return order;
    }

    save(order: OrderEntity): Promise<OrderEntity> {
        return this.orderRepo.save(order);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<OrderDTO>> {
        const query = this.orderRepo.createQueryBuilder('order');
        query.leftJoinAndSelect('order.products', 'products');
        query.withDeleted();
    
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(order.customerName ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
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
    
    
        const ordersDTO = result.map((it) => new OrderDTO(it, undefined, it.products.map(item => new ProductDTO(item))));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<OrderDTO>(ordersDTO, pageMetaDto);
    }
}