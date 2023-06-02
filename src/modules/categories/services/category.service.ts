import { Moment } from "@/utils/my-moment.util";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "../database/entities/category.entity";
import { ICategoryRepository } from "../database/repositories/category.repository";
import { CreateCategoryDTO } from "../dtos/requests/create-category.dto";
import { UpdateCategoryDTO } from "../dtos/requests/update-category.dto";
import { CategoryDTO } from "../dtos/responses/category.dto";


export interface ICategoryService {
    getEntityById(id: string): Promise<CategoryEntity>;
    getById(id: string): Promise<CategoryDTO>;
    getAll(queryType: QueryTypeEnum): Promise<CategoryDTO[]>;
    create(createCategory: CreateCategoryDTO, userId: string): Promise<CategoryDTO>;
    update(id: string, updateCategory: UpdateCategoryDTO, userId: string): Promise<CategoryDTO>;
    delete(id: string, userId: string): Promise<CategoryDTO>;
}

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepo: ICategoryRepository,
    ){}

    getEntityById(id: string): Promise<CategoryEntity>{
        return this.categoryRepo.getById(id);
    }

    async getById(id: string): Promise<CategoryDTO> {
        const foundCategory = await this.categoryRepo.getById(id); 
        const categoryDTO = new CategoryDTO(foundCategory);
        return categoryDTO;
    }

    async getAll(queryType: QueryTypeEnum): Promise<CategoryDTO[]>{
        const categories = await this.categoryRepo.getAll(queryType);

        const categoriesDTO = categories.map(category => new CategoryDTO(category));

        return categoriesDTO;
    }

    async create(createCategory: CreateCategoryDTO, userId: string): Promise<CategoryDTO> {
        const {name} = createCategory;

        const category = new CategoryEntity(name, new Array<ProductEntity>());
        category.createdBy = userId;
        category.updatedBy = userId;
        
        const createdCategory = await this.categoryRepo.save(category);
        const categoryDTO =  new CategoryDTO(createdCategory);
        return categoryDTO
    }

    async update(id: string, updateCategory: UpdateCategoryDTO, userId: string): Promise<CategoryDTO>{
        const foundCategory = await this.categoryRepo.getById(id);

        const category = Object.assign(foundCategory,{
            ...updateCategory,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedCategory = await this.categoryRepo.save(category);

        const categoryDTO = new CategoryDTO(updatedCategory);

        return categoryDTO;
    }

    async delete(id: string, userId: string): Promise<CategoryDTO>{
        const foundCategory = await this.categoryRepo.getById(id);

        const category = Object.assign(foundCategory,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedCategory = await this.categoryRepo.save(category);

        const categoryDTO = new CategoryDTO(deletedCategory);

        return categoryDTO;
    }
}