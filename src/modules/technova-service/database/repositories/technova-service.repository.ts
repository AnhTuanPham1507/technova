

import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TechnovaServiceDTO } from "../../dtos/responses/technova-service.dto";
import { TechnovaServiceEntity } from "../entities/technova-service.entity";

export interface ITechnovaServiceRepository {
    getById(id: string): Promise<TechnovaServiceEntity> ;
    save(technovaService: TechnovaServiceEntity): Promise<TechnovaServiceEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<TechnovaServiceDTO>>;
}

@Injectable()
export class TechnovaServiceRepository implements ITechnovaServiceRepository {
    
    constructor(
        @InjectRepository(TechnovaServiceEntity)
        private technovaServiceRepo: Repository<TechnovaServiceEntity>,
    ){}

    async getById(id: string): Promise<TechnovaServiceEntity> {
        const technovaService = await this.technovaServiceRepo.findOne({
            where: {
                id
            }
        })

        if(!technovaService){
            throw new NotFoundException(`TechnovaService with id ${id} not found`)
        }

        return technovaService;
    }

    save(technovaService: TechnovaServiceEntity): Promise<TechnovaServiceEntity> {
        return this.technovaServiceRepo.save(technovaService);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<TechnovaServiceDTO>> {
        const query = this.technovaServiceRepo.createQueryBuilder('technovaService');
        query.withDeleted();

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('technovaService.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('technovaService.deleted_at is not null');
            break;
        }

        if(pageOptionsDTO.q){
            query.andWhere('technovaService.title ILIKE :q',{
                q: `%${pageOptionsDTO.q}%`,
            })
        }
        
        query.orderBy(`technovaService.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const technovaServiceDTO = result.map((it) => new TechnovaServiceDTO(it));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<TechnovaServiceDTO>(technovaServiceDTO, pageMetaDto);
    }
}