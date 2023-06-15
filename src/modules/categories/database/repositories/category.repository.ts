import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { CategoryDTO } from "@modules/categories/dtos/responses/category.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { query } from "express";
import { IsNull, Not, Repository } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryRepository {
    getById(id: string): Promise<CategoryEntity>;
    save(category: CategoryEntity): Promise<CategoryEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<CategoryDTO>>;
}

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepo: Repository<CategoryEntity>
    ){}

    async getById(id: string): Promise<CategoryEntity> {
        const category = await this.categoryRepo.findOne({
            where:{
                id
            }
        })

        if(!category){
            throw new NotFoundException(`Cateogory with id ${id} can't be found`);
        }

        return category;
    }

    save(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryRepo.save(category);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<CategoryDTO>> {
        const query = this.categoryRepo.createQueryBuilder('category');
        query.withDeleted();
    
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(category.name ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
          });
        }

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('category.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('category.deleted_at is not null');
            break;
        }
        
        query.orderBy(`category.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const categoriesDTO = result.map((it) => new CategoryDTO(it));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<CategoryDTO>(categoriesDTO, pageMetaDto);
    }
}