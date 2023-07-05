

import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AboutCompanyDTO } from "../../dtos/responses/about-company.dto";
import { AboutCompanyEntity } from "../entities/about-company.entity";

export interface IAboutCompanyRepository {
    getById(id: string): Promise<AboutCompanyEntity> ;
    save(aboutCompany: AboutCompanyEntity): Promise<AboutCompanyEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<AboutCompanyDTO>>;
}

@Injectable()
export class AboutCompanyRepository implements IAboutCompanyRepository {
    
    constructor(
        @InjectRepository(AboutCompanyEntity)
        private aboutCompanyRepo: Repository<AboutCompanyEntity>,
    ){}

    async getById(id: string): Promise<AboutCompanyEntity> {
        const aboutCompany = await this.aboutCompanyRepo.findOne({
            where: {
                id
            }
        })

        if(!aboutCompany){
            throw new NotFoundException(`AboutCompany with id ${id} not found`)
        }

        return aboutCompany;
    }

    save(aboutCompany: AboutCompanyEntity): Promise<AboutCompanyEntity> {
        return this.aboutCompanyRepo.save(aboutCompany);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<AboutCompanyDTO>> {
        const query = this.aboutCompanyRepo.createQueryBuilder('aboutCompany');
        query.withDeleted();

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('aboutCompany.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('aboutCompany.deleted_at is not null');
            break;
        }

        if(pageOptionsDTO.q){
            query.andWhere('aboutCompany.title ILIKE :q',{
                q: `%${pageOptionsDTO.q}%`,
            })
        }
        
        query.orderBy(`aboutCompany.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const aboutCompanyDTO = result.map((it) => new AboutCompanyDTO(it));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<AboutCompanyDTO>(aboutCompanyDTO, pageMetaDto);
    }
}