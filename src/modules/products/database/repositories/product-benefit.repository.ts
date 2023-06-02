import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductBenefitEntity } from "../entities/product-benefit.entity";

export interface IProductBenefitRepository {
    getByIds(ids: string[]): Promise<ProductBenefitEntity[]>;
    save(productBenefit: ProductBenefitEntity): Promise<ProductBenefitEntity>;
}

@Injectable()
export class ProductBenefitRepository implements IProductBenefitRepository{
    constructor(
        @InjectRepository(ProductBenefitEntity)
        private readonly productBenefitRepo: Repository<ProductBenefitEntity>
    ){}

    save(productBenefit: ProductBenefitEntity): Promise<ProductBenefitEntity>{
        return this.save(productBenefit);
    }

    getByIds(ids: string[]): Promise<ProductBenefitEntity[]> {
        return this.productBenefitRepo.find({
            where: {
                id: In(ids)
            }
        })
    }
}