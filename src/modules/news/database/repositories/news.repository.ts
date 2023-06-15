

import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { NewsDTO } from "@modules/news/dtos/responses/news.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsEntity } from "../entities/news.entity";

export interface INewsRepository {
    getById(id: string): Promise<NewsEntity> ;
    save(news: NewsEntity): Promise<NewsEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NewsDTO>>;
}

@Injectable()
export class NewsRepository implements INewsRepository {
    
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepo: Repository<NewsEntity>,
    ){}

    async getById(id: string): Promise<NewsEntity> {
        const news = await this.newsRepo.findOne({
            where: {
                id
            }
        })

        if(!news){
            throw new NotFoundException(`News with id ${id} not found`)
        }

        return news;
    }

    save(news: NewsEntity): Promise<NewsEntity> {
        return this.newsRepo.save(news);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NewsDTO>> {
        const query = this.newsRepo.createQueryBuilder('news');
        query.withDeleted();

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('news.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('news.deleted_at is not null');
            break;
        }
        
        query.orderBy(`news.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const newsDTO = result.map((it) => new NewsDTO(it));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<NewsDTO>(newsDTO, pageMetaDto);
    }
}