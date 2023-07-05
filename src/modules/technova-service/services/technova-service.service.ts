import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { IImageService } from "@modules/images/services/image.service";
import { Inject, Injectable } from "@nestjs/common";
import { TechnovaServiceEntity } from "../database/entities/technova-service.entity";
import { ITechnovaServiceRepository } from "../database/repositories/technova-service.repository";
import { CreateTechnovaServiceDTO } from "../dtos/requests/create-technova-service.dto";
import { UpdateTechnovaServiceDTO } from "../dtos/requests/update-technova-service.dto";
import { TechnovaServiceDTO } from "../dtos/responses/technova-service.dto";



export interface ITechnovaServiceService {
    getEntityById(id: string): Promise<TechnovaServiceEntity>;
    getById(id: string): Promise<TechnovaServiceDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<TechnovaServiceDTO>>;
    create(createTechnovaService: CreateTechnovaServiceDTO, userId: string): Promise<TechnovaServiceDTO>;
    update(id: string, updateTechnovaService: UpdateTechnovaServiceDTO, userId: string): Promise<TechnovaServiceDTO>;
    delete(id: string, userId: string): Promise<TechnovaServiceDTO>;
}

@Injectable()
export class TechnovaServiceService implements ITechnovaServiceService {
    constructor(
        @Inject('ITechnovaServiceRepository')
        private readonly technovaServiceRepo: ITechnovaServiceRepository,
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    getEntityById(id: string): Promise<TechnovaServiceEntity>{
        return this.technovaServiceRepo.getById(id);
    }

    async getById(id: string): Promise<TechnovaServiceDTO> {
        const foundTechnovaService = await this.technovaServiceRepo.getById(id); 
        const images = await this.imageService.getByObject(foundTechnovaService.id, ImageObjectTypeEnum.NEWS, QueryTypeEnum.ALL); 
        const technovaServiceDTO = new TechnovaServiceDTO(foundTechnovaService,images[0]);
        return technovaServiceDTO;
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<TechnovaServiceDTO>>{
        const technovaServiceDTO = await this.technovaServiceRepo.getAll(pageOptionsDTO);
        const mappedImageTechnovaService = await Promise.all(
            technovaServiceDTO.data.map(
                async technovaService => {
                    const images = await this.imageService.getByObject(technovaService.id, ImageObjectTypeEnum.TECHNOVA_SERVICE, QueryTypeEnum.ALL);
                    technovaService.image = images[0];
                    return technovaService;
            })
        )

        technovaServiceDTO.data = mappedImageTechnovaService;
        return technovaServiceDTO;
    }

    async create(createTechnovaService: CreateTechnovaServiceDTO, userId: string): Promise<TechnovaServiceDTO> {
        const {content, title, description, imageId} = createTechnovaService;

        const technovaService = new TechnovaServiceEntity(title, content, description);
        technovaService.createdBy = userId;
        technovaService.updatedBy = userId;
        const createdTechnovaService = await this.technovaServiceRepo.save(technovaService);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [imageId],
            objectId: createdTechnovaService.id,
            objectType: ImageObjectTypeEnum.TECHNOVA_SERVICE
        })
        const images = await this.imageService.update(assignImage, userId)
        return new TechnovaServiceDTO(createdTechnovaService, images[0]);
    }

    async update(id: string, updateTechnovaService: UpdateTechnovaServiceDTO, userId: string): Promise<TechnovaServiceDTO>{
        const foundTechnovaService = await this.technovaServiceRepo.getById(id);
        const technovaService = Object.assign(foundTechnovaService,{
            ...updateTechnovaService,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedTechnovaService = await  this.technovaServiceRepo.save(technovaService);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateTechnovaService.imageId],
            objectId: updatedTechnovaService.id,
            objectType: ImageObjectTypeEnum.TECHNOVA_SERVICE
        })
        const images = await this.imageService.update(assignImage, userId);

        return new TechnovaServiceDTO(updatedTechnovaService, images[0]);
    }

    async delete(id: string, userId: string): Promise<TechnovaServiceDTO>{
        const foundTechnovaService = await this.technovaServiceRepo.getById(id);

        const technovaService = Object.assign(foundTechnovaService,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedTechnovaService = await this.technovaServiceRepo.save(technovaService);

        const technovaServiceDTO = new TechnovaServiceDTO(deletedTechnovaService);

        return technovaServiceDTO;
    }
}