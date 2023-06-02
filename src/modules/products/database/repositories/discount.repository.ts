import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DiscountEntity } from "../entities/discount.entity";

export interface IDiscountRepository {
    getById(ids: string): Promise<DiscountEntity>;
    save(discount: DiscountEntity): Promise<DiscountEntity>;
}

@Injectable()
export class DiscountRepository implements IDiscountRepository{
    constructor(
        @InjectRepository(DiscountEntity)
        private readonly discountRepo: Repository<DiscountEntity>
    ){}

    save(discount: DiscountEntity): Promise<DiscountEntity>{
        return this.save(discount);
    }

    async getById(id: string): Promise<DiscountEntity> {
        const discount = await this.discountRepo.findOne({
            where: {
                id
            }
        })

        if(!discount){
            throw new NotFoundException(`Discount with id ${id} not found`)
        }

        return discount;
    }
}