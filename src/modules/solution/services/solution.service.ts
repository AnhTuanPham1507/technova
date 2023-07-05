import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UpdateImageDTO } from "@modules/images/dtos/requests/update-image.dto";
import { IImageService } from "@modules/images/services/image.service";
import { Inject, Injectable } from "@nestjs/common";
import { SolutionEntity } from "../database/entities/solution.entity";
import { ISolutionRepository } from "../database/repositories/solution.repository";
import { CreateSolutionDTO } from "../dtos/requests/create-solution.dto";
import { UpdateSolutionDTO } from "../dtos/requests/update-solution.dto";
import { SolutionDTO } from "../dtos/responses/solution.dto";
export interface ISolutionService {
    getEntityById(id: string): Promise<SolutionEntity>;
    getById(id: string): Promise<SolutionDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<SolutionDTO>>;
    create(createSolution: CreateSolutionDTO, userId: string): Promise<SolutionDTO>;
    update(id: string, updateSolution: UpdateSolutionDTO, userId: string): Promise<SolutionDTO>;
    delete(id: string, userId: string): Promise<SolutionDTO>;
}

@Injectable()
export class SolutionService implements ISolutionService {
    constructor(
        @Inject('ISolutionRepository')
        private readonly solutionRepo: ISolutionRepository,
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    getEntityById(id: string): Promise<SolutionEntity>{
        return this.solutionRepo.getById(id);
    }

    async getById(id: string): Promise<SolutionDTO> {
        const foundSolution = await this.solutionRepo.getById(id);
        const images = await this.imageService.getByObject(foundSolution.id, ImageObjectTypeEnum.NEWS, QueryTypeEnum.ALL); 
        const solutionDTO = new SolutionDTO(foundSolution, images[0]);
        return solutionDTO;
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<SolutionDTO>>{
        const solutionDTO = await this.solutionRepo.getAll(pageOptionsDTO);
        const mappedImageSolution = await Promise.all(
            solutionDTO.data.map(
                async solution => {
                    const images = await this.imageService.getByObject(solution.id, ImageObjectTypeEnum.SOLUTION, QueryTypeEnum.ALL);
                    solution.image = images[0];
                    return solution;
            })
        )

        solutionDTO.data = mappedImageSolution;
        return solutionDTO;
    }

    async create(createSolution: CreateSolutionDTO, userId: string): Promise<SolutionDTO> {
        const {content, title, description, imageId} = createSolution;

        const solution = new SolutionEntity(title, content, description);
        solution.createdBy = userId;
        solution.updatedBy = userId;
        const createdSolution = await this.solutionRepo.save(solution);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [imageId],
            objectId: createdSolution.id,
            objectType: ImageObjectTypeEnum.SOLUTION
        })
        const images = await this.imageService.update(assignImage, userId)
        return new SolutionDTO(createdSolution, images[0]);
    }

    async update(id: string, updateSolution: UpdateSolutionDTO, userId: string): Promise<SolutionDTO>{
        const foundSolution = await this.solutionRepo.getById(id);
        const solution = Object.assign(foundSolution,{
            ...updateSolution,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedSolution = await  this.solutionRepo.save(solution);

        const assignImage = Object.assign(new UpdateImageDTO,{
            imageIds: [updateSolution.imageId],
            objectId: updatedSolution.id,
            objectType: ImageObjectTypeEnum.SOLUTION
        })
        const images = await this.imageService.update(assignImage, userId);

        return new SolutionDTO(updatedSolution, images[0]);
    }

    async delete(id: string, userId: string): Promise<SolutionDTO>{
        const foundSolution = await this.solutionRepo.getById(id);

        const solution = Object.assign(foundSolution,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedSolution = await this.solutionRepo.save(solution);

        const solutionDTO = new SolutionDTO(deletedSolution);

        return solutionDTO;
    }
}