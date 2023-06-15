import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
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
    ){}

    getEntityById(id: string): Promise<SolutionEntity>{
        return this.solutionRepo.getById(id);
    }

    async getById(id: string): Promise<SolutionDTO> {
        const foundSolution = await this.solutionRepo.getById(id); 
        const solutionDTO = new SolutionDTO(foundSolution);
        return solutionDTO;
    }

    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<SolutionDTO>>{
        return this.solutionRepo.getAll(pageOptionsDTO);
    }

    async create(createSolution: CreateSolutionDTO, userId: string): Promise<SolutionDTO> {
        const {content, title} = createSolution;

        const solution = new SolutionEntity(title, content);
        solution.createdBy = userId;
        solution.updatedBy = userId;
        
        const createdSolution = await this.solutionRepo.save(solution);
        console.log(createSolution)
        return new SolutionDTO(createdSolution);
    }

    async update(id: string, updateSolution: UpdateSolutionDTO, userId: string): Promise<SolutionDTO>{
        const foundSolution = await this.solutionRepo.getById(id);
        const solution = Object.assign(foundSolution,{
            ...updateSolution,
            updatedAt: Moment.getCurrentDate(),
            updatedBy: userId
        });

        const updatedSolution = await  this.solutionRepo.save(solution);
        return new SolutionDTO(updatedSolution);
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