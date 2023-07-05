

import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { SolutionDTO } from "@modules/solution/dtos/responses/solution.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SolutionEntity } from "../entities/solution.entity";

export interface ISolutionRepository {
    getById(id: string): Promise<SolutionEntity> ;
    save(solution: SolutionEntity): Promise<SolutionEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<SolutionDTO>>;
}

@Injectable()
export class SolutionRepository implements ISolutionRepository {
    
    constructor(
        @InjectRepository(SolutionEntity)
        private solutionRepo: Repository<SolutionEntity>,
    ){}

    async getById(id: string): Promise<SolutionEntity> {
        const solution = await this.solutionRepo.findOne({
            where: {
                id
            }
        })

        if(!solution){
            throw new NotFoundException(`Solution with id ${id} not found`)
        }

        return solution;
    }

    save(solution: SolutionEntity): Promise<SolutionEntity> {
        return this.solutionRepo.save(solution);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<SolutionDTO>> {
        const query = this.solutionRepo.createQueryBuilder('solution');
        query.withDeleted();

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('solution.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('solution.deleted_at is not null');
            break;
        }
        
        if(pageOptionsDTO.q){
            query.andWhere('aboutCompany.title ILIKE :q',{
                q: `%${pageOptionsDTO.q}%`,
            })
        }
        
        query.orderBy(`solution.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const solutionDTO = result.map((it) => new SolutionDTO(it));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<SolutionDTO>(solutionDTO, pageMetaDto);
    }
}