import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { EmployeeDTO } from "@modules/clients/dtos/responses/employee.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeeEntity } from "../entities/employee.entity";

export interface IEmployeeRepository {
    getById(id: string): Promise<EmployeeEntity>;
    save(employee: EmployeeEntity): Promise<EmployeeEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<EmployeeDTO>>;
    getByAccountId(accountId: string): Promise<EmployeeEntity> ;
}

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeeRepo: Repository<EmployeeEntity>
    ){}

    async getById(id: string): Promise<EmployeeEntity> {
        const employee = await this.employeeRepo.findOne({
            where:{
                id
            },
            relations: ['account']
        })

        if(!employee){
            throw new NotFoundException(`Employee with id ${id} can't be found`);
        }

        return employee;
    }

    async getByAccountId(accountId: string): Promise<EmployeeEntity> {
        const employee = await this.employeeRepo.findOne({
            where:{
                account: {
                    id: accountId
                }
            }
        })

        if(!employee){
            throw new NotFoundException(`Employee can't be found`);
        }

        return employee;
    }

    save(employee: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeRepo.save(employee);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<EmployeeDTO>> {
        const query = this.employeeRepo.createQueryBuilder('employee');       
        query.leftJoinAndSelect('employee.account','account')
        query.withDeleted();
    
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(employee.name ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
          });
        }

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('employee.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('employee.deleted_at is not null');
            break;
        }
        
        query.orderBy(`employee.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const employeeDTO = result.map((it) => new EmployeeDTO(it, it.account.email));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<EmployeeDTO>(employeeDTO, pageMetaDto);
    }
}