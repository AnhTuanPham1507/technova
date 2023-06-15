import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { IImageService } from "@modules/images/services/image.service";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { IProductService } from "@modules/products/services/product.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { BrandEntity } from "../database/entities/brand.entity";
import { IBrandRepository } from "../database/repositories/brand.repository";
import { CreateBrandDTO } from "../dtos/requests/create-brand.dto";
import { UpdateBrandDTO } from "../dtos/requests/update-brand.dto";
import { BrandDTO } from "../dtos/responses/brand.dto";

export interface IBrandService {
    getEntityById(id: string): Promise<BrandEntity>;
    getById(id: string): Promise<BrandDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<BrandDTO>>;
    create(createBrand: CreateBrandDTO, userId: string): Promise<BrandDTO>;
    update(id: string, updateBrand: UpdateBrandDTO, userId: string): Promise<BrandDTO>;
    delete(id: string, userId: string): Promise<BrandDTO>;
}

@Injectable()
export class BrandService implements IBrandService {
    constructor(
        @Inject('IBrandRepository')
        private readonly brandRepo: IBrandRepository,
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    getEntityById(id: string): Promise<BrandEntity>{
        return this.brandRepo.getById(id);
    }

    async getById(id: string): Promise<BrandDTO> {
        const foundBrand = await this.brandRepo.getById(id); 
        const brandDTO = new BrandDTO(foundBrand);
        return brandDTO;
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<BrandDTO>>{
        const pageBrandsDTO = await this.brandRepo.getAll(pageOptionsDTO);

        const mappedImageBrands = await Promise.all(
            pageBrandsDTO.data.map(
                async brand => {
                    const images = await this.imageService.getByObject(brand.id, ImageObjectTypeEnum.BRAND, QueryTypeEnum.ALL);
                    brand.image = images[0];
                    return brand;
            })
        )

        pageBrandsDTO.data = mappedImageBrands;
        return pageBrandsDTO;
    }

    async create(createBrand: CreateBrandDTO, userId: string): Promise<BrandDTO> {
        const {name, imageId} = createBrand;

        const brand = new BrandEntity(name, new Array<ProductEntity>());
        brand.createdBy = userId;
        brand.updatedBy = userId;
        
        const createdBrand = await this.brandRepo.save(brand);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [imageId],
            objectId: createdBrand.id,
            objectType: ImageObjectTypeEnum.BRAND
        })
        console.log(assignImage)
        const images = await this.imageService.update(assignImage, userId);
        const brandDTO =  new BrandDTO(createdBrand, images[0]);
        return brandDTO
    }

    async update(id: string, updateBrand: UpdateBrandDTO, userId: string): Promise<BrandDTO>{
        const foundBrand = await this.brandRepo.getById(id);
        const brand = Object.assign(foundBrand,{
            ...updateBrand,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedBrand = await this.brandRepo.save(brand);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateBrand.imageId],
            objectId: updatedBrand.id,
            objectType: ImageObjectTypeEnum.BRAND
        })
        const images = await this.imageService.update(assignImage, userId);

        const brandDTO =  new BrandDTO(updatedBrand, images[0]);

        return brandDTO;
    }

    async delete(id: string, userId: string): Promise<BrandDTO>{
        const foundBrand = await this.brandRepo.getById(id);

        const brand = Object.assign(foundBrand,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedBrand = await this.brandRepo.save(brand);

        const brandDTO = new BrandDTO(deletedBrand);

        return brandDTO;
    }
}