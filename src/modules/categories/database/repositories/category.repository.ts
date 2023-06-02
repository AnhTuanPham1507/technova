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
    getAll(queryType: QueryTypeEnum): Promise<CategoryEntity[]>;
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

    getAll(queryType: QueryTypeEnum): Promise<CategoryEntity[]> {
        const query = this.categoryRepo.createQueryBuilder('category');

        switch(queryType){
            case QueryTypeEnum.ALL:
              break;
            case QueryTypeEnum.ACTIVATE:
              query.andWhere('category.deleted_at is null');
              break;
            case QueryTypeEnum.DEACTIVATE:
              query.andWhere('category.deleted_at is not null');
              break;
          }

        return query.getMany();
    }
}