import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { BenefitValueEntity } from "../entities/benefit-value.entity";

export interface IBenefitValueRepository {
    save(benefitValue: BenefitValueEntity): Promise<BenefitValueEntity>;
    getById(id: string): Promise<BenefitValueEntity>;
}

@Injectable()
export class BenefitValueRepository implements IBenefitValueRepository{
    constructor(
        @InjectRepository(BenefitValueEntity)
        private readonly benefitValueRepo: Repository<BenefitValueEntity>
    ){}

    save(benefitValue: BenefitValueEntity): Promise<BenefitValueEntity>{
        return this.benefitValueRepo.save(benefitValue);
    }

    async getById(id: string): Promise<BenefitValueEntity>{
        const foundBenefitValue = await this.benefitValueRepo.findOne({
            where: {
                id
            }
        })

        if(!foundBenefitValue){
            throw new NotFoundException(`Không thể tìm thấy benefit value với id ${id}`);
        }

        return foundBenefitValue;
    }

}