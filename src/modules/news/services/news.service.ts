import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { IImageService } from "@modules/images/services/image.service";
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
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    getEntityById(id: string): Promise<NewsEntity>{
        return this.newsRepo.getById(id);
    }

    async getById(id: string): Promise<NewsDTO> {
        const foundNews = await this.newsRepo.getById(id); 
        const images = await this.imageService.getByObject(foundNews.id, ImageObjectTypeEnum.NEWS, QueryTypeEnum.ALL);
        const newsDTO = new NewsDTO(foundNews, images[0]);
        return newsDTO;
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NewsDTO>>{
        const newsDTO = await this.newsRepo.getAll(pageOptionsDTO);
        const mappedImageNews = await Promise.all(
            newsDTO.data.map(
                async news => {
                    const images = await this.imageService.getByObject(news.id, ImageObjectTypeEnum.NEWS, QueryTypeEnum.ALL);
                    news.image = images[0];
                    return news;
            })
        )

        newsDTO.data = mappedImageNews;
        return newsDTO;
    }

    async create(createNews: CreateNewsDTO, userId: string): Promise<NewsDTO> {
        const {content, title, description, imageId} = createNews;

        const news = new NewsEntity(title, content, description);
        news.createdBy = userId;
        news.updatedBy = userId;
        const createdNews = await this.newsRepo.save(news);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [imageId],
            objectId: createdNews.id,
            objectType: ImageObjectTypeEnum.NEWS
        })
        const images = await this.imageService.update(assignImage, userId)
        return new NewsDTO(createdNews, images[0]);
    }

    async update(id: string, updateNews: UpdateNewsDTO, userId: string): Promise<NewsDTO>{
        const foundNews = await this.newsRepo.getById(id);
        const news = Object.assign(foundNews,{
            ...updateNews,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedNews = await  this.newsRepo.save(news);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateNews.imageId],
            objectId: updatedNews.id,
            objectType: ImageObjectTypeEnum.NEWS
        })
        const images = await this.imageService.update(assignImage, userId);

        return new NewsDTO(updatedNews, images[0]);
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