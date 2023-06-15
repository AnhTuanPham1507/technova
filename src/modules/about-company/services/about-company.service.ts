import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
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
    ){}

    getEntityById(id: string): Promise<AboutCompanyEntity>{
        return this.aboutCompanyRepo.getById(id);
    }

    async getById(id: string): Promise<AboutCompanyDTO> {
        const foundAboutCompany = await this.aboutCompanyRepo.getById(id); 
        const aboutCompanyDTO = new AboutCompanyDTO(foundAboutCompany);
        return aboutCompanyDTO;
    }

    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<AboutCompanyDTO>>{
        return this.aboutCompanyRepo.getAll(pageOptionsDTO);
    }

    async create(createAboutCompany: CreateAboutCompanyDTO, userId: string): Promise<AboutCompanyDTO> {
        const {content, title} = createAboutCompany;

        const aboutCompany = new AboutCompanyEntity(title, content);
        aboutCompany.createdBy = userId;
        aboutCompany.updatedBy = userId;
        
        const createdAboutCompany = await this.aboutCompanyRepo.save(aboutCompany);
        return new AboutCompanyDTO(createdAboutCompany)
    }

    async update(id: string, updateAboutCompany: UpdateAboutCompanyDTO, userId: string): Promise<AboutCompanyDTO>{
        const foundAboutCompany = await this.aboutCompanyRepo.getById(id);
        const aboutCompany = Object.assign(foundAboutCompany,{
            ...updateAboutCompany,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedAboutCompany = await this.aboutCompanyRepo.save(aboutCompany);
        return new AboutCompanyDTO(updatedAboutCompany);
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