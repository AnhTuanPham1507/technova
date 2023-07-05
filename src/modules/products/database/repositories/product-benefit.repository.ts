import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { ProductBenefitEntity } from "../entities/product-benefit.entity";

export interface IProductBenefitRepository {
    getByProductId(id: string): Promise<ProductBenefitEntity[]>;
    save(productBenefit: ProductBenefitEntity): Promise<ProductBenefitEntity>;
    getById(id: string): Promise<ProductBenefitEntity>;
}

@Injectable()
export class ProductBenefitRepository implements IProductBenefitRepository{
    constructor(
        @InjectRepository(ProductBenefitEntity)
        private readonly productBenefitRepo: Repository<ProductBenefitEntity>
    ){}

    save(productBenefit: ProductBenefitEntity): Promise<ProductBenefitEntity>{
        return this.productBenefitRepo.save(productBenefit);
    }

    getByProductId(id: string): Promise<ProductBenefitEntity[]> {
        const query = this.productBenefitRepo.createQueryBuilder('benefit');
        query.leftJoinAndSelect('benefit.product', 'product');
        query.leftJoinAndSelect('benefit.benefitValues', 'benefitValues')
        query.leftJoinAndSelect('benefitValues.productPackage', 'productPackage')

        query.where('(benefit.product = :productId)', {
            productId: id,
          });

        return query.getMany();
    }

    async getById(id: string): Promise<ProductBenefitEntity>{
        const productBenefit = await this.productBenefitRepo.findOne({
            where: {
                id
            },
            relations: ['benefitValues']
        })

        if(!productBenefit){
            throw new NotFoundException(`Product benefit with id ${id} can't be found`)
        }

        return productBenefit;
    }
}