import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { CreateAccountDTO } from "@modules/auth/dtos/requests/create-account.dto";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { AuthService } from "@modules/auth/services/auth.service";
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../database/entities/user.entity";
import { IUserRepository } from "../database/repositories/user.repository";
import { CreateUserDTO } from "../dtos/requests/create-user.dto";
import { UpdateUserDTO } from "../dtos/requests/update-user.dto";
import { UserDTO } from "../dtos/responses/user.dto";

export interface IUserService {
    getByAccountId(id: string): Promise<UserDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<UserDTO>>;
    create(createUser: CreateUserDTO): Promise<UserDTO>;
    update(id: string, updateUser: UpdateUserDTO, account: AccountDTO): Promise<UserDTO>;
    delete(id: string, account: AccountDTO): Promise<UserDTO>;
    getEntityById(id: string): Promise<UserEntity>;
    getEntityByAccountId(id: string): Promise<UserEntity>;
}

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepo: IUserRepository,
        @Inject('IAuthService')
        private readonly accountService: AuthService
    ){}

    async getByAccountId(id: string): Promise<UserDTO> {
        const foundUser = await this.userRepo.getByAccountId(id); 
        const userDTO = new UserDTO(foundUser,foundUser.account.email);
        return userDTO;
    }

    getEntityById(id: string): Promise<UserEntity>{
        return this.userRepo.getById(id);
    }

    getEntityByAccountId(id: string): Promise<UserEntity>{
        return this.userRepo.getByAccountId(id);
    }

    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<UserDTO>>{
        return this.userRepo.getAll(pageOptionsDTO);
    }

    async create(createUser: CreateUserDTO): Promise<UserDTO> {
        const {password, name, phone, email, address,} = createUser;

        const createdAccount = await this.accountService.create({email, password, role: RoleEnum.USER} as CreateAccountDTO)
        const user = new UserEntity(name, phone, address, createdAccount);
        
        const createdUser = await this.userRepo.save(user);

        const userDTO =  new UserDTO(createdUser, createdAccount.email);
        return userDTO
    }

    async update(id: string, updateUser: UpdateUserDTO, account: AccountDTO): Promise<UserDTO>{

        const foundUser = await this.userRepo.getById(id);

        if(foundUser.account.id !== account.id){
            throw new ForbiddenException(`You don't have permission to do this action`)
        }

        const user = Object.assign(foundUser,{
            ...updateUser,
        });

        const updatedUser = await this.userRepo.save(user);

        const userDTO =  new UserDTO(updatedUser, updatedUser.account.email);

        return userDTO;
    }

    async delete(id: string, account: AccountDTO): Promise<UserDTO>{
        const foundUser = await this.userRepo.getById(id);
        const deletedAccount = await this.accountService.delete(foundUser.account.id, account)
        const user = Object.assign(foundUser,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:account.id
        })

        const deletedUser = await this.userRepo.save(user);

        const userDTO = new UserDTO(deletedUser, deletedUser.account.email);

        return userDTO;
    }
}