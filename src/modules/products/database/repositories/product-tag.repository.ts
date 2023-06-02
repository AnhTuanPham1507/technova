import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductTagEntity } from "../entities/product-tag.entity";

export interface IProductTagRepository {
    getByIds(ids: string[]): Promise<ProductTagEntity[]>;
    save(productTag: ProductTagEntity): Promise<ProductTagEntity>;
}

@Injectable()
export class ProductTagRepository implements IProductTagRepository{
    constructor(
        @InjectRepository(ProductTagEntity)
        private readonly productTagRepo: Repository<ProductTagEntity>
    ){}

    save(productTag: ProductTagEntity): Promise<ProductTagEntity>{
        return this.save(productTag);
    }

    getByIds(ids: string[]): Promise<ProductTagEntity[]> {
        return this.productTagRepo.find({
            where: {
                id: In(ids)
            }
        })
    }
}