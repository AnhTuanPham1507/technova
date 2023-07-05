import { IBrandService } from "@modules/brands/services/brand.service";
import { ICategoryService } from "@modules/categories/services/category.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ProductEntity } from "../database/entities/product.entity";
import { IProductRepository } from "../database/repositories/product.repository";
import { CreateProductDTO } from "../dtos/requests/create-product.dto";
import { ProductDTO } from "../dtos/responses/product.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { UpdateProductDTO } from "../dtos/requests/update-product.dto";
import { Moment } from "@/utils/my-moment.util";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { IImageService } from "@modules/images/services/image.service";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { CategoryDTO } from "@modules/categories/dtos/responses/category.dto";
import { ProductPageOptionsDTO } from "../dtos/requests/product-page-option.dto";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";

export interface IProductService {
    create(createProduct: CreateProductDTO, account: AccountDTO): Promise<ProductDTO>;
    getAll(pageOptions: ProductPageOptionsDTO): Promise<PageDTO<ProductDTO>>;
    getById(id: string): Promise<ProductDTO>;
    getByIds(ids: string[]): Promise<ProductDTO[]>;
    update(id: string, updateProduct: UpdateProductDTO, account: AccountDTO): Promise<ProductDTO>;
    delete(id: string, account: AccountDTO): Promise<ProductDTO>;
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
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    async create(createProduct: CreateProductDTO, account: AccountDTO): Promise<ProductDTO> {
        const {brandId, categoryId, description, name, imageId, isContactToSell} = createProduct;

        const brand = await this.brandService.getEntityById(brandId);
        const category = await this.categoryService.getEntityById(categoryId);
        
        const product = new ProductEntity(name, description, isContactToSell, brand, category);
        product.createdBy = account.id;
        product.updatedBy = account.id;

        const createdProduct = await this.productRepo.save(product);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [imageId],
            objectId: createdProduct.id,
            objectType: ImageObjectTypeEnum.PRODUCT
        })
        const images = await this.imageService.update(assignImage, account.id);
        
        const brandDTO = createdProduct.brand? new BrandDTO(createdProduct.brand): undefined;
        const categoryDTO = createdProduct.category? new CategoryDTO(createdProduct.category): undefined;
        const productDTO =  new ProductDTO(createdProduct, brandDTO, categoryDTO, images[0]);
        return productDTO
    }

    async getAll(pageOptions: ProductPageOptionsDTO): Promise<PageDTO<ProductDTO>> {
        const pageProductsDTO = await this.productRepo.getAll(pageOptions);

        const mappedImageProducts = await Promise.all(
            pageProductsDTO.data.map(
                async product => {
                    const images = await this.imageService.getByObject(product.id, ImageObjectTypeEnum.PRODUCT, QueryTypeEnum.ALL);
                    product.image = images[0];
                    return product;
            })
        )
        pageProductsDTO.data = mappedImageProducts;
        return pageProductsDTO;
    }

    async getById(id: string): Promise<ProductDTO>{
        const foundProduct = await this.productRepo.getById(id);
        const images = await this.imageService.getByObject(foundProduct.id, ImageObjectTypeEnum.PRODUCT, QueryTypeEnum.ALL);
        const imageDTO = images[0];
        const brandDTO = foundProduct.brand? new BrandDTO(foundProduct.brand): undefined;
        const categoryDTO = foundProduct.category ? new CategoryDTO(foundProduct.category) : undefined;
        const productDTO = new ProductDTO(foundProduct,brandDTO, categoryDTO );
        productDTO.image = imageDTO;
        return productDTO;
    }

    async getByIds(ids: string[]): Promise<ProductDTO[]>{
        const foundProducts = await this.productRepo.getByIds(ids);
        const productsDTO = foundProducts.map(product => new ProductDTO(product));
        return productsDTO;
    }

    async update(id: string, updateProduct: UpdateProductDTO, account: AccountDTO): Promise<ProductDTO>{
        const foundProduct = await this.productRepo.getById(id);
        const brand = await this.brandService.getEntityById(updateProduct.brandId);
        const category = await this.categoryService.getEntityById(updateProduct.categoryId);
        
        const product = Object.assign(foundProduct,{
            ...updateProduct,
            brand,
            category,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: account.id
        });

        const updatedProduct = await this.productRepo.save(product);
        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateProduct.imageId],
            objectId: updatedProduct.id,
            objectType: ImageObjectTypeEnum.PRODUCT
        })
        const images = await this.imageService.update(assignImage, account.id);

         const brandDTO = updatedProduct.brand? new BrandDTO(updatedProduct.brand): undefined;
        const categoryDTO = updatedProduct.category? new CategoryDTO(updatedProduct.category): undefined;
        const productDTO =  new ProductDTO(updatedProduct, brandDTO, categoryDTO, images[0]);

        return productDTO;
    }

    async delete(id: string, account: AccountDTO): Promise<ProductDTO>{
        const foundProduct = await this.productRepo.getById(id);

        const product = Object.assign(foundProduct,{
            ...foundProduct,
            deletedAt: Moment.getCurrentDate(),
            deletedBy:account.id
        })


        const deletedProduct = await this.productRepo.save(product);

        const productDTO = new ProductDTO(deletedProduct);

        return productDTO;
    }
}