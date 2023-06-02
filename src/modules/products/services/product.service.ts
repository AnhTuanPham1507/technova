import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { IBrandService } from "@modules/brands/services/brand.service";
import { ICategoryService } from "@modules/categories/services/category.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ProductEntity } from "../database/entities/product.entity";
import { IProductBenefitRepository } from "../database/repositories/product-benefit.repository";
import { IProductTagRepository } from "../database/repositories/product-tag.repository";
import { IProductRepository } from "../database/repositories/product.repository";
import { CreateProductDTO } from "../dtos/requests/create-product.dto";
import { ProductDTO } from "../dtos/responses/product.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { UpdateProductDTO } from "../dtos/requests/update-product.dto";
import { Moment } from "@/utils/my-moment.util";

export interface IProductService {
    create(createProduct: CreateProductDTO, userId: string): Promise<ProductDTO>;
    getAll(pageOptions: PageOptionsDTO): Promise<PageDTO<ProductDTO>>;
    getById(id: string): Promise<ProductDTO>;
    getByIds(ids: string[]): Promise<ProductDTO[]>;
    update(id: string, updateProduct: UpdateProductDTO, userId: string): Promise<ProductDTO>;
    delete(id: string, userId: string): Promise<ProductDTO>;
}

@Injectable()
export class ProductService implements IProductService{
    constructor(
        @Inject(forwardRef(() =>'IBrandService'))
        private readonly brandService: IBrandService,
        @Inject('ICategoryService')
        private readonly categoryService: ICategoryService,
        @Inject('IProductRepository')
        private readonly productRepo: IProductRepository,
        @Inject('IProductBenefitRepository')
        private readonly productBenefitRepo: IProductBenefitRepository,
        @Inject('IProductTagRepository')
        private readonly productTagRepo: IProductTagRepository
    ){}

    async create(createProduct: CreateProductDTO, userId: string): Promise<ProductDTO> {
        const {brandId, categoryId, benefitIds, tagIds, description, name} = createProduct;

        const brand = await this.brandService.getEntityById(brandId);
        const category = await this.categoryService.getEntityById(categoryId);
        const benefits = await this.productBenefitRepo.getByIds(benefitIds);
        const tags = await this.productTagRepo.getByIds(tagIds);

        const product = new ProductEntity(name, description, brand, category, tags, benefits);
        product.createdBy = userId;
        product.updatedBy = userId;

        const createdProduct = await this.productRepo.save(product);
        const productDTO =  new ProductDTO(createdProduct);
        return productDTO
    }

    getAll(pageOptions: PageOptionsDTO): Promise<PageDTO<ProductDTO>> {
        return this.productRepo.getAll(pageOptions);
    }

    async getById(id: string): Promise<ProductDTO>{
        const foundProduct = await this.productRepo.getById(id);
        const productDTO = new ProductDTO(foundProduct);
        return productDTO;
    }

    async getByIds(ids: string[]): Promise<ProductDTO[]>{
        const foundProducts = await this.productRepo.getByIds(ids);
        const productsDTO = foundProducts.map(product => new ProductDTO(product));
        return productsDTO;
    }

    async update(id: string, updateProduct: UpdateProductDTO, userId: string): Promise<ProductDTO>{
        const foundProduct = await this.productRepo.getById(id);

        const product = Object.assign(foundProduct,{
            ...updateProduct,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedProduct = await this.productRepo.save(product);

        const productDTO = new ProductDTO(updatedProduct);

        return productDTO;
    }

    async delete(id: string, userId: string): Promise<ProductDTO>{
        const foundProduct = await this.productRepo.getById(id);

        const product = Object.assign(foundProduct,{
            ...foundProduct,
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedProduct = await this.productRepo.save(product);

        const productDTO = new ProductDTO(deletedProduct);

        return productDTO;
    }
}