import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { CategoryDTO } from "@modules/categories/dtos/responses/category.dto";
import { ProductPageOptionsDTO } from "@modules/products/dtos/requests/product-page-option.dto";
import { ProductDTO } from "@modules/products/dtos/responses/product.dto";
import { ConsoleLogger, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  getAll(pageOptionsDTO: ProductPageOptionsDTO): Promise<PageDTO<ProductDTO>>;
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

    async getAll(pageOptionsDTO: ProductPageOptionsDTO): Promise<PageDTO<ProductDTO>> {
        const query = this.productRepo.createQueryBuilder('product');
        query.leftJoinAndSelect('product.category', 'category');
        query.leftJoinAndSelect('product.brand', 'brand')
        query.withDeleted();
    
      
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(product.name ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
          });
        }
        if(pageOptionsDTO.brandIds){
          query.andWhere('brand.id in (:...brandIds)',{brandIds: pageOptionsDTO.brandIds});
        }

        if(pageOptionsDTO.categoryIds){
          query.andWhere('category.id in(:...categoryIds)',{categoryIds: pageOptionsDTO.categoryIds});
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
        
        query.orderBy(`product.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();

        const productDTO = result.map((it) => {
          const brandDTO = it.brand? new BrandDTO(it.brand): undefined;
          const categoryDTO = it.category? new CategoryDTO(it.category): undefined;
          return new ProductDTO(it, brandDTO, categoryDTO);
        });
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<ProductDTO>(productDTO, pageMetaDto);
    }

    async getById(id: string): Promise<ProductEntity>{
      const product = await this.productRepo.findOne({
        where: {
          id
        },
        relations: ['brand', 'category']
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