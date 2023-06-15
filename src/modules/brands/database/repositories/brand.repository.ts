import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { ProductDTO } from "@modules/products/dtos/responses/product.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BrandEntity } from "../entities/brand.entity";

export interface IBrandRepository {
    getById(id: string): Promise<BrandEntity> ;
    save(brand: BrandEntity): Promise<BrandEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<BrandDTO>>;
}

@Injectable()
export class BrandRepository implements IBrandRepository {
    
    constructor(
        @InjectRepository(BrandEntity)
        private brandRepo: Repository<BrandEntity>,
    ){}

    async getById(id: string): Promise<BrandEntity> {
        const brand = await this.brandRepo.findOne({
            where: {
                id
            }
        })

        if(!brand){
            throw new NotFoundException(`Brand with id ${id} not found`)
        }

        return brand;
    }

    save(brand: BrandEntity): Promise<BrandEntity> {
        return this.brandRepo.save(brand);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<BrandDTO>> {
        const query = this.brandRepo.createQueryBuilder('brand');
        query.leftJoinAndSelect('brand.products', 'products');
        query.withDeleted();
    
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(brand.name ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
          });
        }

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('brand.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('brand.deleted_at is not null');
            break;
        }
        
        query.orderBy(`brand.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const brandsDTO = result.map((it) => new BrandDTO(it, undefined, it.products.map(item => new ProductDTO(item))));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<BrandDTO>(brandsDTO, pageMetaDto);
    }
}