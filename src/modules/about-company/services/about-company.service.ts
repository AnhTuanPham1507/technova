import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { IImageService } from "@modules/images/services/image.service";
import { Inject, Injectable } from "@nestjs/common";
import { AboutCompanyEntity } from "../database/entities/about-company.entity";
import { IAboutCompanyRepository } from "../database/repositories/about-company.repository";
import { CreateAboutCompanyDTO } from "../dtos/requests/create-about-company.dto";
import { UpdateAboutCompanyDTO } from "../dtos/requests/update-about-company.dto";
import { AboutCompanyDTO } from "../dtos/responses/about-company.dto";


export interface IAboutCompanyService {
    getEntityById(id: string): Promise<AboutCompanyEntity>;
    getById(id: string): Promise<AboutCompanyDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<AboutCompanyDTO>>;
    create(createAboutCompany: CreateAboutCompanyDTO, userId: string): Promise<AboutCompanyDTO>;
    update(id: string, updateAboutCompany: UpdateAboutCompanyDTO, userId: string): Promise<AboutCompanyDTO>;
    delete(id: string, userId: string): Promise<AboutCompanyDTO>;
}

@Injectable()
export class AboutCompanyService implements IAboutCompanyService {
    constructor(
        @Inject('IAboutCompanyRepository')
        private readonly aboutCompanyRepo: IAboutCompanyRepository,
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    getEntityById(id: string): Promise<AboutCompanyEntity>{
        return this.aboutCompanyRepo.getById(id);
    }

    async getById(id: string): Promise<AboutCompanyDTO> {
        const foundAboutCompany = await this.aboutCompanyRepo.getById(id); 
        const images = await this.imageService.getByObject(foundAboutCompany.id, ImageObjectTypeEnum.NEWS, QueryTypeEnum.ALL); 
        const aboutCompanyDTO = new AboutCompanyDTO(foundAboutCompany, images[0]);
        return aboutCompanyDTO;
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<AboutCompanyDTO>>{
        const aboutCompanyDTO = await this.aboutCompanyRepo.getAll(pageOptionsDTO);
        const mappedImageAboutCompany = await Promise.all(
            aboutCompanyDTO.data.map(
                async aboutCompany => {
                    const images = await this.imageService.getByObject(aboutCompany.id, ImageObjectTypeEnum.ABOUT_TECHNOVA, QueryTypeEnum.ALL);
                    aboutCompany.image = images[0];
                    return aboutCompany;
            })
        )

        aboutCompanyDTO.data = mappedImageAboutCompany;
        return aboutCompanyDTO;
    }

    async create(createAboutCompany: CreateAboutCompanyDTO, userId: string): Promise<AboutCompanyDTO> {
        const {content, title, description, imageId} = createAboutCompany;

        const aboutCompany = new AboutCompanyEntity(title, content, description);
        aboutCompany.createdBy = userId;
        aboutCompany.updatedBy = userId;
        const createdAboutCompany = await this.aboutCompanyRepo.save(aboutCompany);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [imageId],
            objectId: createdAboutCompany.id,
            objectType: ImageObjectTypeEnum.ABOUT_TECHNOVA
        })
        const images = await this.imageService.update(assignImage, userId)
        return new AboutCompanyDTO(createdAboutCompany, images[0]);
    }

    async update(id: string, updateAboutCompany: UpdateAboutCompanyDTO, userId: string): Promise<AboutCompanyDTO>{
        const foundAboutCompany = await this.aboutCompanyRepo.getById(id);
        const aboutCompany = Object.assign(foundAboutCompany,{
            ...updateAboutCompany,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedAboutCompany = await  this.aboutCompanyRepo.save(aboutCompany);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateAboutCompany.imageId],
            objectId: updatedAboutCompany.id,
            objectType: ImageObjectTypeEnum.ABOUT_TECHNOVA
        })
        const images = await this.imageService.update(assignImage, userId);

        return new AboutCompanyDTO(updatedAboutCompany, images[0]);
    }

    async delete(id: string, userId: string): Promise<AboutCompanyDTO>{
        const foundAboutCompany = await this.aboutCompanyRepo.getById(id);

        const aboutCompany = Object.assign(foundAboutCompany,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedAboutCompany = await this.aboutCompanyRepo.save(aboutCompany);

        const aboutCompanyDTO = new AboutCompanyDTO(deletedAboutCompany);

        return aboutCompanyDTO;
    }
}