import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductPackageEntity } from "../entities/product-package.entity";

export interface IProductPackageRepository {
    getByIds(ids: string[]): Promise<ProductPackageEntity[]>;
    save(productPackage: ProductPackageEntity): Promise<ProductPackageEntity>;
}

@Injectable()
export class ProductPackageRepository implements IProductPackageRepository{
    constructor(
        @InjectRepository(ProductPackageEntity)
        private readonly productPackageRepo: Repository<ProductPackageEntity>
    ){}

    save(productPackage: ProductPackageEntity): Promise<ProductPackageEntity>{
        return this.save(productPackage);
    }

    getByIds(ids: string[]): Promise<ProductPackageEntity[]> {
        return this.productPackageRepo.find({
            where: {
                id: In(ids)
            }
        })
    }
}