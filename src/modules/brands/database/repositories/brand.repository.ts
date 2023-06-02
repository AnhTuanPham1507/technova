import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BrandEntity } from "../entities/brand.entity";

export interface IBrandRepository {
    getById(id: string): Promise<BrandEntity> ;
    save(brand: BrandEntity): Promise<BrandEntity>;
    getAll(queryType: QueryTypeEnum): Promise<BrandEntity[]>;
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

    getAll(queryType: QueryTypeEnum): Promise<BrandEntity[]> {
        const query = this.brandRepo.createQueryBuilder('brand');

        switch(queryType){
            case QueryTypeEnum.ALL:
              break;
            case QueryTypeEnum.ACTIVATE:
              query.andWhere('brand.deleted_at is null');
              break;
            case QueryTypeEnum.DEACTIVATE:
              query.andWhere('brand.deleted_at is not null');
              break;
          }

        return query.getMany();
    }
}