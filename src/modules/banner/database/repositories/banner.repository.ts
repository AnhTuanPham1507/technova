
import { BannerDTO } from "@modules/banner/dtos/responses/banner.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BannerEntity } from "../entities/banner.entity";

export interface IBannerRepository {
    save(banner: BannerEntity): Promise<BannerEntity>;
    getAll(): Promise<BannerDTO[]>;
    getById(id: string): Promise<BannerEntity>;
}

@Injectable()
export class BannerRepository implements IBannerRepository {
    
    constructor(
        @InjectRepository(BannerEntity)
        private bannerRepo: Repository<BannerEntity>,
    ){}

    save(banner: BannerEntity): Promise<BannerEntity> {
        return this.bannerRepo.save(banner);
    }

    async getById(id: string): Promise<BannerEntity>{
        const banner = await this.bannerRepo.findOne({
            where:{
                id
            }
        });

        if(!banner){
            throw new NotFoundException(`Banner can't be found`)
        }

        return banner;
    }

    async getAll(): Promise<BannerDTO[]> {
        const query = this.bannerRepo.createQueryBuilder('banner');

        
        query.orderBy(`banner.collocate`,'ASC');
    
        const result = await query.getMany();
    
        const bannersDTO = result.map((it) => new BannerDTO(it));
    
        return bannersDTO;
    }
}