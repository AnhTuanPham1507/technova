import { Moment } from "@/utils/my-moment.util";
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { CreateAccountDTO } from "@modules/auth/dtos/requests/create-account.dto";
import { AuthService } from "@modules/auth/services/auth.service";
import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../database/entities/user.entity";
import { IUserRepository } from "../database/repositories/user.repository";
import { CreateUserDTO } from "../dtos/requests/create-user.dto";
import { UpdateUserDTO } from "../dtos/requests/update-user.dto";
import { UserDTO } from "../dtos/responses/user.dto";

export interface IUserService {
    getById(id: string): Promise<UserDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<UserDTO>>;
    create(createUser: CreateUserDTO): Promise<UserDTO>;
    update(id: string, updateUser: UpdateUserDTO): Promise<UserDTO>;
    delete(id: string, userId: string): Promise<UserDTO>;
}

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepo: IUserRepository,
        @Inject('IAuthService')
        private readonly accountService: AuthService
    ){}

    async getById(id: string): Promise<UserDTO> {
        const foundUser = await this.userRepo.getById(id); 
        const userDTO = new UserDTO(foundUser);
        return userDTO;
    }

    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<UserDTO>>{
        return this.userRepo.getAll(pageOptionsDTO);
    }

    async create(createUser: CreateUserDTO): Promise<UserDTO> {
        const {password, name, phone, email, address,} = createUser;

        const createdAccount = await this.accountService.create({email, password, role: RoleEnum.USER} as CreateAccountDTO)
        const user = new UserEntity(name, phone, address, createdAccount);
        
        const createdUser = await this.userRepo.save(user);

        const userDTO =  new UserDTO(createdUser);
        return userDTO
    }

    async update(id: string, updateUser: UpdateUserDTO): Promise<UserDTO>{
        const foundUser = await this.userRepo.getById(id);
        const user = Object.assign(foundUser,{
            ...updateUser,
        });

        const updatedUser = await this.userRepo.save(user);

        const userDTO =  new UserDTO(updatedUser);

        return userDTO;
    }

    async delete(id: string, userId: string): Promise<UserDTO>{
        const foundUser = await this.userRepo.getById(id);

        const user = Object.assign(foundUser,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })

        const deletedUser = await this.userRepo.save(user);

        const userDTO = new UserDTO(deletedUser);

        return userDTO;
    }
}