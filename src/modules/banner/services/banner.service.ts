import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { IImageService } from "@modules/images/services/image.service";
import { Inject, Injectable } from "@nestjs/common";
import { BannerEntity } from "../database/entities/banner.entity";
import { IBannerRepository } from "../database/repositories/banner.repository";
import { CreateBannerDTO } from "../dtos/requests/create-banner.dto";
import { UpdateBannerDTO } from "../dtos/requests/update-banner.dto";
import { BannerDTO } from "../dtos/responses/banner.dto";

export interface IBannerService {
    getAll(): Promise<BannerDTO[]>;
    create(createBanner: CreateBannerDTO, userId: string): Promise<BannerDTO>;
    delete(id: string, userId: string): Promise<BannerDTO>;
    update(id: string, updateBanner: UpdateBannerDTO, userId: string): Promise<BannerDTO>;
}

@Injectable()
export class BannerService implements IBannerService {
    constructor(
        @Inject('IBannerRepository')
        private readonly bannerRepo: IBannerRepository,
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}


    async getAll(): Promise<BannerDTO[]>{
        const banners = await this.bannerRepo.getAll();
        return Promise.all(
                banners.map(
                    async banner => {
                        const images = await this.imageService.getByObject(banner.id, ImageObjectTypeEnum.BANNER, QueryTypeEnum.ALL);
                        banner.image = images[0];
                        return banner;
                    }
                )
            )
    }

    async create(createBanner: CreateBannerDTO, userId: string): Promise<BannerDTO> {
        const {collocate, title, imageId} = createBanner;

        const banner = new BannerEntity(title, collocate);
        banner.createdBy = userId;
        banner.updatedBy = userId;
        
        const createdBanner = await this.bannerRepo.save(banner);

        const assignImage = Object.assign(new UpdateImageDTO(),{
            imageIds: [imageId],
            objectId: createdBanner.id,
            objectType: ImageObjectTypeEnum.BANNER
        })
        const images = await this.imageService.update(assignImage, userId);
        
        return new BannerDTO(createdBanner, images[0])
    }

    async update(id: string, updateBanner: UpdateBannerDTO, userId: string): Promise<BannerDTO>{
        const foundBanner = await this.bannerRepo.getById(id);
        const banner = Object.assign(foundBanner,{
            ...updateBanner,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedBanner = await this.bannerRepo.save(banner);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateBanner.imageId],
            objectId: updatedBanner.id,
            objectType: ImageObjectTypeEnum.BANNER
        })
        const images = await this.imageService.update(assignImage, userId);

        const bannerDTO =  new BannerDTO(updatedBanner, images[0]);

        return bannerDTO;
    }

    async delete(id: string, userId: string): Promise<BannerDTO>{
        const foundBanner = await this.bannerRepo.getById(id);

        const banner = Object.assign(foundBanner,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedBanner = await this.bannerRepo.save(banner);

        const bannerDTO = new BannerDTO(deletedBanner);

        return bannerDTO;
    }
}