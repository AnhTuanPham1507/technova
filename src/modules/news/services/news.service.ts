import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { ImageDTO } from "@modules/images/dtos/responses/image.dto";
import { IImageService } from "@modules/images/services/image.service";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { Inject, Injectable } from "@nestjs/common";
import { NewsEntity } from "../database/entities/news.entity";
import { INewsRepository } from "../database/repositories/news.repository";
import { CreateNewsDTO } from "../dtos/requests/create-news.dto";
import { UpdateNewsDTO } from "../dtos/requests/update-news.dto";
import { NewsDTO } from "../dtos/responses/news.dto";

export interface INewsService {
    getEntityById(id: string): Promise<NewsEntity>;
    getById(id: string): Promise<NewsDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NewsDTO>>;
    create(createNews: CreateNewsDTO, userId: string): Promise<NewsDTO>;
    update(id: string, updateNews: UpdateNewsDTO, userId: string): Promise<NewsDTO>;
    delete(id: string, userId: string): Promise<NewsDTO>;
}

@Injectable()
export class NewsService implements INewsService {
    constructor(
        @Inject('INewsRepository')
        private readonly newsRepo: INewsRepository,
    ){}

    getEntityById(id: string): Promise<NewsEntity>{
        return this.newsRepo.getById(id);
    }

    async getById(id: string): Promise<NewsDTO> {
        const foundNews = await this.newsRepo.getById(id); 
        const newsDTO = new NewsDTO(foundNews);
        return newsDTO;
    }

    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NewsDTO>>{
        return this.newsRepo.getAll(pageOptionsDTO);
    }

    async create(createNews: CreateNewsDTO, userId: string): Promise<NewsDTO> {
        const {content, title} = createNews;

        const news = new NewsEntity(title, content);
        news.createdBy = userId;
        news.updatedBy = userId;
        
        const createdNews = await this.newsRepo.save(news);
        console.log(createNews)
        return new NewsDTO(createdNews);
    }

    async update(id: string, updateNews: UpdateNewsDTO, userId: string): Promise<NewsDTO>{
        const foundNews = await this.newsRepo.getById(id);
        const news = Object.assign(foundNews,{
            ...updateNews,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedNews = await  this.newsRepo.save(news);
        return new NewsDTO(updatedNews);
    }

    async delete(id: string, userId: string): Promise<NewsDTO>{
        const foundNews = await this.newsRepo.getById(id);

        const news = Object.assign(foundNews,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedNews = await this.newsRepo.save(news);

        const newsDTO = new NewsDTO(deletedNews);

        return newsDTO;
    }
}