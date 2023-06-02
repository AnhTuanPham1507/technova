import { Moment } from "@/utils/my-moment.util";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
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
    getAll(queryType: QueryTypeEnum): Promise<BrandDTO[]>;
    create(createBrand: CreateBrandDTO, userId: string): Promise<BrandDTO>;
    update(id: string, updateBrand: UpdateBrandDTO, userId: string): Promise<BrandDTO>;
    delete(id: string, userId: string): Promise<BrandDTO>;
}

@Injectable()
export class BrandService implements IBrandService {
    constructor(
        @Inject('IBrandRepository')
        private readonly brandRepo: IBrandRepository,
        @Inject(forwardRef(() =>'IProductService'))
        private readonly productService: IProductService
    ){}

    getEntityById(id: string): Promise<BrandEntity>{
        return this.brandRepo.getById(id);
    }

    async getById(id: string): Promise<BrandDTO> {
        const foundBrand = await this.brandRepo.getById(id); 
        const brandDTO = new BrandDTO(foundBrand);
        return brandDTO;
    }

    async getAll(queryType: QueryTypeEnum): Promise<BrandDTO[]>{
        const brands = await this.brandRepo.getAll(queryType);

        const brandsDTO = brands.map(brand => new BrandDTO(brand));

        return brandsDTO;
    }

    async create(createBrand: CreateBrandDTO, userId: string): Promise<BrandDTO> {
        const {name} = createBrand;

        const brand = new BrandEntity(name, new Array<ProductEntity>());
        brand.createdBy = userId;
        brand.updatedBy = userId;
        
        const createdBrand = await this.brandRepo.save(brand);
        const brandDTO =  new BrandDTO(createdBrand);
        return brandDTO
    }

    async update(id: string, updateBrand: UpdateBrandDTO, userId: string): Promise<BrandDTO>{
        const foundBrand = await this.brandRepo.getById(id);
        const foundProducts = await this.productService.getByIds(updateBrand.productIds);

        const brand = Object.assign(foundBrand,{
            ...updateBrand,
            products: foundProducts,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedBrand = await this.brandRepo.save(brand);

        const brandDTO = new BrandDTO(updatedBrand);

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