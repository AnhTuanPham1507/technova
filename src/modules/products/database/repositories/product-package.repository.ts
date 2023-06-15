import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { ProductPackageEntity } from "../entities/product-package.entity";

export interface IProductPackageRepository {
    getByProductId(id: string): Promise<ProductPackageEntity[]>;
    save(productPackage: ProductPackageEntity): Promise<ProductPackageEntity>;
    getById(id: string): Promise<ProductPackageEntity>;
}

@Injectable()
export class ProductPackageRepository implements IProductPackageRepository{
    constructor(
        @InjectRepository(ProductPackageEntity)
        private readonly productPackageRepo: Repository<ProductPackageEntity>
    ){}

    save(productPackage: ProductPackageEntity): Promise<ProductPackageEntity>{
        return this.productPackageRepo.save(productPackage);
    }

    getByProductId(id: string): Promise<ProductPackageEntity[]> {
        const query = this.productPackageRepo.createQueryBuilder('productPackage');
        query.leftJoinAndSelect('productPackage.product', 'product');
        query.leftJoinAndSelect('productPackage.benefitValues', 'benefitValues')
        query.withDeleted();

        query.where('(productPackage.product = :productId)', {
            productId: id,
          });

        return query.getMany();
    }

    async getById(id: string): Promise<ProductPackageEntity>{
        const productPackage = await this.productPackageRepo.findOne({
            where: {
                id
            },
            relations: ['benefitValues']
        })

        if(!productPackage){
            throw new NotFoundException(`Product package with id ${id} can't be found`)
        }

        return productPackage;
    }
}