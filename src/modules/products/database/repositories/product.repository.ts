import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { ProductDTO } from "@modules/products/dtos/responses/product.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<ProductDTO>>;
  getById(id: string): Promise<ProductEntity>;
  getByIds(ids: string[]): Promise<ProductEntity[]>;
} 

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,
      ) {}

    save(product: ProductEntity): Promise<ProductEntity> {
        return this.productRepo.save(product);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO,): Promise<PageDTO<ProductDTO>> {
        const query = this.productRepo.createQueryBuilder('product');
        query.leftJoinAndSelect('product.category', 'category');
        query.leftJoinAndSelect('product.brand', 'brand')
        query.withDeleted();
    
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(product.name ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
          });
        }

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('product.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('product.deleted_at is not null');
            break;
        }
        
        query.orderBy(`moment.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const productDTO = result.map((it) => new ProductDTO(it));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<ProductDTO>(productDTO, pageMetaDto);
    }

    async getById(id: string): Promise<ProductEntity>{
      const product = await this.productRepo.findOne({
        where: {
          id
        }
      })

      if(!product){
        throw new NotFoundException(`Product with id ${id} can't be found`);
      }

      return product;
    }

    getByIds(ids: string[]): Promise<ProductEntity[]>{
      return this.productRepo.find({
        where: {
          id: In(ids)
        }
      })
    }
}