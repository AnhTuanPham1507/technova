import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { CreateAccountDTO } from "@modules/auth/dtos/requests/create-account.dto";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { AuthService } from "@modules/auth/services/auth.service";
import { Inject, Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../database/entities/employee.entity";
import { IEmployeeRepository } from "../database/repositories/employee.dto";
import { CreateEmployeeDTO } from "../dtos/requests/create-employee.dto";
import { UpdateEmployeeDTO } from "../dtos/requests/update-employee.dto";
import { EmployeeDTO } from "../dtos/responses/employee.dto";

export interface IEmployeeService {
    getEntityById(id: string): Promise<EmployeeEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<EmployeeDTO>>;
    create(createEmployee: CreateEmployeeDTO): Promise<EmployeeDTO>;
    update(id: string, updateEmployee: UpdateEmployeeDTO): Promise<EmployeeDTO>;
    delete(id: string, account: AccountDTO): Promise<EmployeeDTO>;
    getEntityByAccountId(id: string): Promise<EmployeeEntity>;
    getByAccountId(id: string): Promise<EmployeeDTO>;
}

@Injectable()
export class EmployeeService implements IEmployeeService {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepo: IEmployeeRepository,
        @Inject('IAuthService')
        private readonly accountService: AuthService
    ){}

    async getByAccountId(id: string): Promise<EmployeeDTO> {
        const foundEmployee = await this.employeeRepo.getByAccountId(id); 
        const userDTO = new EmployeeDTO(foundEmployee,foundEmployee.account.email);
        return userDTO;
    }

    getEntityById(id: string): Promise<EmployeeEntity>{
        return this.employeeRepo.getById(id);
    }

    getEntityByAccountId(id: string): Promise<EmployeeEntity>{
        return this.employeeRepo.getByAccountId(id);
    }

    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<EmployeeDTO>>{
        return this.employeeRepo.getAll(pageOptionsDTO);
    }

    async create(createEmployee: CreateEmployeeDTO): Promise<EmployeeDTO> {
        const {password, name, email} = createEmployee;

        const createdAccount = await this.accountService.create({email, password, role: RoleEnum.EMPLOYEE} as CreateAccountDTO)
        const employee = new EmployeeEntity(name, createdAccount);
        
        const createdEmployee = await this.employeeRepo.save(employee);

        const employeeDTO =  new EmployeeDTO(createdEmployee, createdEmployee.account.email);
        return employeeDTO
    }

    async update(id: string, updateEmployee: UpdateEmployeeDTO): Promise<EmployeeDTO>{
        const foundEmployee = await this.employeeRepo.getById(id);
        const employee = Object.assign(foundEmployee,{
            ...updateEmployee,
        });
        employee.account.password =  await this.accountService.hashPassword(updateEmployee.password);
        employee.account.email =  updateEmployee.email;
        await this.accountService.save(employee.account);

        const updatedEmployee = await this.employeeRepo.save(employee);

        const employeeDTO =  new EmployeeDTO(updatedEmployee, updatedEmployee.account.email);

        return employeeDTO;
    }

    async delete(id: string, account: AccountDTO): Promise<EmployeeDTO>{
        const foundEmployee = await this.employeeRepo.getById(id);
        await this.accountService.delete(foundEmployee.account.id, account)
        const employee = Object.assign(foundEmployee,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:account.id
        })

        const deletedEmployee = await this.employeeRepo.save(employee);

        const employeeDTO = new EmployeeDTO(deletedEmployee, deletedEmployee.account.email);

        return employeeDTO;
    }
}