import {  Inject, Injectable } from "@nestjs/common";
import { CreateProductPackageDTO } from "../dtos/requests/create-product-packge.dto";
import { IProductPackageRepository } from "../database/repositories/product-package.repository";
import { IProductRepository } from "../database/repositories/product.repository";
import { ProductPackageEntity } from "../database/entities/product-package.entity";
import { ProductPackageDTO } from "../dtos/responses/product-package.dto";
import { IBenefitValueRepository } from "../database/repositories/benefit-value.repository";
import { IProductBenefitRepository } from "../database/repositories/product-benefit.repository";
import { BenefitValueEntity } from "../database/entities/benefit-value.entity";
import { BenefitValueDTO } from "../dtos/responses/benefit-value.dto";
import { ProductBenefitDTO } from "../dtos/responses/product-benefit.dto";
import { UpdateProductPackageDTO } from "../dtos/requests/update-product-packge.dto";
import { Moment } from "@/utils/my-moment.util";
import { IBenefitValueService } from "./benefit-value.service";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";

export interface IProductPackageService {
    getByProductId(productId: string): Promise<ProductPackageDTO[]>;
    create(createProductPackage: CreateProductPackageDTO, account: AccountDTO): Promise<ProductPackageDTO>;
    getById(id: string): Promise<ProductPackageEntity>;
    delete(id: string, account: AccountDTO): Promise<ProductPackageDTO>;
    update(id: string, updateProductPackage: UpdateProductPackageDTO, account: AccountDTO): Promise<ProductPackageDTO>;
}

@Injectable()
export class ProductPackageService implements IProductPackageService{
    constructor(
        @Inject('IProductPackageRepository')
        private readonly productPackageRepo: IProductPackageRepository,
        @Inject('IProductRepository')
        private readonly productRepo: IProductRepository,
        @Inject('IProductBenefitRepository')
        private readonly productBenefitRepo: IProductBenefitRepository,
        @Inject('IBenefitValueRepository')
        private readonly benefitValueRepo: IBenefitValueRepository,
        @Inject('IBenefitValueService')
        private readonly benefitValueService: IBenefitValueService
    ){}

    async create(createProductPackage: CreateProductPackageDTO, account: AccountDTO): Promise<ProductPackageDTO> {
        const {price, currency, productId, name, timeRange, timeRangeNumber, userNumber} = createProductPackage;

        const product = await this.productRepo.getById(productId);
        
        const productPackagePackage = new ProductPackageEntity(name, price, currency,userNumber, timeRange, timeRangeNumber, product);
        productPackagePackage.createdBy = account.id;
        productPackagePackage.updatedBy = account.id;

        const createdProductPackage = await this.productPackageRepo.save(productPackagePackage);

        const benefits = await this.productBenefitRepo.getByProductId(productId);
        const benefitValuesDTO = await Promise.all(
            benefits.map(
                async benefit => {
                    const benefitDTO = new ProductBenefitDTO(benefit);
                    const benefitValue = new BenefitValueEntity('', createdProductPackage, benefit);
                    benefitValue.createdBy = account.id
                    benefitValue.updatedBy = account.id
                    const value = await this.benefitValueRepo.save(benefitValue);
                    return new BenefitValueDTO(value, undefined, benefitDTO);
                }
            )
        )
        const productPackagePackageDTO =  new ProductPackageDTO(createdProductPackage, benefitValuesDTO);
        return productPackagePackageDTO;
    }

    async getByProductId(productId: string): Promise<ProductPackageDTO[]>{
        const packages = await this.productPackageRepo.getByProductId(productId);
        return packages.map(productPackage => new ProductPackageDTO(productPackage));
    }

    getById(id: string): Promise<ProductPackageEntity>{
        return this.productPackageRepo.getById(id);
    }

    async update(id: string, updateProductPackage: UpdateProductPackageDTO, account: AccountDTO): Promise<ProductPackageDTO>{
        const foundProductPackage = await this.productPackageRepo.getById(id);
        const productPackage = Object.assign(foundProductPackage,{
            ...updateProductPackage,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: account.id
        });

        const updatedProductPackage = await this.productPackageRepo.save(productPackage);


        const productPackageDTO =  new ProductPackageDTO(updatedProductPackage);

        return productPackageDTO;
    }

    async delete(id: string, account: AccountDTO): Promise<ProductPackageDTO>{
        const foundProductPackage = await this.productPackageRepo.getById(id);

        const productPackage = Object.assign(foundProductPackage,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:account.id
        })

        const deletedProductPackage = await this.productPackageRepo.save(productPackage);
        await Promise.all(
            foundProductPackage.benefitValues.map(
                value => this.benefitValueService.delete(value.id, account.id)
            )
        );

        const productPackageDTO = new ProductPackageDTO(deletedProductPackage);

        return productPackageDTO;
    }
}