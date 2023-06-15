import { Moment } from "@/utils/my-moment.util";
import {  Inject, Injectable } from "@nestjs/common";
import { IBenefitValueRepository } from "../database/repositories/benefit-value.repository";
import { UpdateBenefitValueDTO } from "../dtos/requests/update-benefit-value.dto";
import { BenefitValueDTO } from "../dtos/responses/benefit-value.dto";



export interface IBenefitValueService {
    update(id: string,updateBenefitValue: UpdateBenefitValueDTO, userId: string): Promise<BenefitValueDTO>;
    delete(id: string, userId: string): Promise<BenefitValueDTO>;
}

@Injectable()
export class BenefitValueService implements IBenefitValueService{
    constructor(
        @Inject('IBenefitValueRepository')
        private readonly benefitValueRepo: IBenefitValueRepository,
    ){}

    async update(id: string,updateBenefitValue: UpdateBenefitValueDTO, userId: string): Promise<BenefitValueDTO> {
        const foundBenefitValue = await this.benefitValueRepo.getById(id);
        const benefitValue = Object.assign(foundBenefitValue,{
            ...updateBenefitValue,
            updatedBy: userId,
            updatedAt: Moment.getCurrentDate()
        })
        const updatedBenefitValue = await this.benefitValueRepo.save(benefitValue);
        return new BenefitValueDTO(updatedBenefitValue);
    }

    async delete(id: string, userId: string): Promise<BenefitValueDTO>{
        const foundPBenefitValue = await this.benefitValueRepo.getById(id);

        const benefitValue = Object.assign(foundPBenefitValue,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedPBenefitValue = await this.benefitValueRepo.save(benefitValue);

        const benefitValueDTO = new BenefitValueDTO(deletedPBenefitValue);

        return benefitValueDTO;
    }

}