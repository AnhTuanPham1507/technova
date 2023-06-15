import { Moment } from "@/utils/my-moment.util";
import {  Inject, Injectable } from "@nestjs/common";
import { BenefitValueEntity } from "../database/entities/benefit-value.entity";
import { ProductBenefitEntity } from "../database/entities/product-benefit.entity";
import { IBenefitValueRepository } from "../database/repositories/benefit-value.repository";
import { IProductBenefitRepository } from "../database/repositories/product-benefit.repository";
import { IProductPackageRepository } from "../database/repositories/product-package.repository";
import { IProductRepository } from "../database/repositories/product.repository";
import { UpdateProductBenefitDTO } from "../dtos/requests/create-benefit-value.dto";
import { CreateProductBenefitDTO } from "../dtos/requests/create-product-benefit.dto";
import { BenefitValueDTO } from "../dtos/responses/benefit-value.dto";
import { ProductBenefitDTO } from "../dtos/responses/product-benefit.dto";
import { ProductPackageDTO } from "../dtos/responses/product-package.dto";
import { IBenefitValueService } from "./benefit-value.service";


export interface IProductBenefitService {
    getByProductId(productId: string): Promise<ProductBenefitDTO[]>;
    create(createProductBenefit: CreateProductBenefitDTO, userId: string): Promise<ProductBenefitDTO>;
    update(id: string, updateProductBenefit: UpdateProductBenefitDTO, userId: string): Promise<ProductBenefitDTO>;
    delete(id: string, userId: string): Promise<ProductBenefitDTO>;
}

@Injectable()
export class ProductBenefitService implements IProductBenefitService{
    constructor(
        @Inject('IProductBenefitRepository')
        private readonly productBenefitRepo: IProductBenefitRepository,
        @Inject('IProductPackageRepository')
        private readonly productPackageRepo: IProductPackageRepository,
        @Inject('IBenefitValueRepository')
        private readonly benefitValueRepo: IBenefitValueRepository,
        @Inject('IProductRepository')
        private readonly productRepo: IProductRepository,
        @Inject('IBenefitValueService')
        private readonly benefitValueService: IBenefitValueService
    ){}

    async create(createProductBenefit: CreateProductBenefitDTO, userId: string): Promise<ProductBenefitDTO> {
        const {productId, name} = createProductBenefit;

        const product = await this.productRepo.getById(productId);
        
        const productBenefitPackage = new ProductBenefitEntity(name, product);
        productBenefitPackage.createdBy = userId;
        productBenefitPackage.updatedBy = userId;
        const createdProductBenefit = await this.productBenefitRepo.save(productBenefitPackage);  

        const productPackages = await this.productPackageRepo.getByProductId(productId);
        const benefitValuesDTO = await Promise.all(
            productPackages.map(
                async productPackage => {
                    const benefitValue = new BenefitValueEntity('', productPackage, createdProductBenefit);
                    benefitValue.createdBy = userId
                    benefitValue.updatedBy = userId
                    const productPackageDTO = new ProductPackageDTO(productPackage)
                    const createdBenefitValue = await this.benefitValueRepo.save(benefitValue);
                    return new BenefitValueDTO(createdBenefitValue, productPackageDTO)
                }
            )
        )
        const productBenefitDTO = new ProductBenefitDTO(createdProductBenefit,benefitValuesDTO );
        return productBenefitDTO;
    }

    async getByProductId(productId: string): Promise<ProductBenefitDTO[]>{
        const benefits = await this.productBenefitRepo.getByProductId(productId);
        return benefits.map(productBenefit => {
            const values = productBenefit.benefitValues.map(value => {
                const packageDTO = new ProductPackageDTO(value.productPackage);
                const benefitDTO = new BenefitValueDTO(value,packageDTO);
                return benefitDTO;
            });
            return new ProductBenefitDTO(productBenefit, values);
        });
    }

     async update(id: string, updateProductBenefit: UpdateProductBenefitDTO, userId: string): Promise<ProductBenefitDTO>{
        const foundProductBenefit = await this.productBenefitRepo.getById(id);
        const productBenefit = Object.assign(foundProductBenefit,{
            ...updateProductBenefit,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedProductBenefit = await this.productBenefitRepo.save(productBenefit);


        const productBenefitDTO =  new ProductBenefitDTO(updatedProductBenefit);

        return productBenefitDTO;
    }

    async delete(id: string, userId: string): Promise<ProductBenefitDTO>{
        const foundProductBenefit = await this.productBenefitRepo.getById(id);

        const productBenefit = Object.assign(foundProductBenefit,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedProductBenefit = await this.productBenefitRepo.save(productBenefit);
        await Promise.all(
            foundProductBenefit.benefitValues.map(
                value => this.benefitValueService.delete(value.id, userId)
            )
        );

        const productBenefitDTO = new ProductBenefitDTO(deletedProductBenefit);

        return productBenefitDTO;
    }


}