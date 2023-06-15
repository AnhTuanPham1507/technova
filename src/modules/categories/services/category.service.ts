import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { IImageService } from "@modules/images/services/image.service";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import {  Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "../database/entities/category.entity";
import { ICategoryRepository } from "../database/repositories/category.repository";
import { CreateCategoryDTO } from "../dtos/requests/create-category.dto";
import { UpdateCategoryDTO } from "../dtos/requests/update-category.dto";
import { CategoryDTO } from "../dtos/responses/category.dto";

export interface ICategoryService {
    getEntityById(id: string): Promise<CategoryEntity>;
    getById(id: string): Promise<CategoryDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<CategoryDTO>>;
    create(createCategory: CreateCategoryDTO, userId: string): Promise<CategoryDTO>;
    update(id: string, updateCategory: UpdateCategoryDTO, userId: string): Promise<CategoryDTO>;
    delete(id: string, userId: string): Promise<CategoryDTO>;
}

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepo: ICategoryRepository,
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    getEntityById(id: string): Promise<CategoryEntity>{
        return this.categoryRepo.getById(id);
    }

    async getById(id: string): Promise<CategoryDTO> {
        const foundCategory = await this.categoryRepo.getById(id); 
        const categoryDTO = new CategoryDTO(foundCategory);
        return categoryDTO;
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<CategoryDTO>>{
        const pageCategoriesDTO = await this.categoryRepo.getAll(pageOptionsDTO);

        const mappedImageCategories = await Promise.all(
            pageCategoriesDTO.data.map(
                async category => {
                    const images = await this.imageService.getByObject(category.id, ImageObjectTypeEnum.CATEGORY, QueryTypeEnum.ALL);
                    category.image = images[0];
                    return category;
            })
        )
        pageCategoriesDTO.data = mappedImageCategories;
        return pageCategoriesDTO;
    }

    async create(createCategory: CreateCategoryDTO, userId: string): Promise<CategoryDTO> {
        const {name, imageId} = createCategory;

        const category = new CategoryEntity(name, new Array<ProductEntity>());
        category.createdBy = userId;
        category.updatedBy = userId;

        const createdCategory = await this.categoryRepo.save(category);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [imageId],
            objectId: createdCategory.id,
            objectType: ImageObjectTypeEnum.CATEGORY
        })
        const images = await this.imageService.update(assignImage, userId);
        const categoryDTO =  new CategoryDTO(createdCategory, images[0]);
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

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateCategory.imageId],
            objectId: updatedCategory.id,
            objectType: ImageObjectTypeEnum.CATEGORY
        })
        const images = await this.imageService.update(assignImage, userId);

        const categoryDTO =  new CategoryDTO(updatedCategory, images[0]);

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