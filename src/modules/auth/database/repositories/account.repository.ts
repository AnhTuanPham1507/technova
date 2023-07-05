import { RoleEnum } from "@constants/enums/role.enum";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountEntity } from "../entities/account.entity";

export interface IAccountRepository {
    getByEmail(email: string): Promise<AccountEntity>;
    save(account: AccountEntity): Promise<AccountEntity>;
    getById(id: string): Promise<AccountEntity>;
    getAdminAccount(): Promise<AccountEntity>;
}

@Injectable()
export class AccountRepository implements IAccountRepository {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepo: Repository<AccountEntity>,
    ){}

    async getByEmail(email: string): Promise<AccountEntity>{
        const account = await this.accountRepo.findOne({
            where: {
                email
            }
        })

        if(!account){
            throw new NotFoundException(`Account with email ${email} can't be found`);
        }

        return account;
    }
    
    save(account: AccountEntity): Promise<AccountEntity>{
        return this.accountRepo.save(account);
    }

    async getById(id: string): Promise<AccountEntity>{
        const account = await this.accountRepo.findOne({
            where:{
                id
            }
        })

        if(!account){
            throw new NotFoundException(`Account can't be found`);
        }

        return account;
    }

    async getAdminAccount(): Promise<AccountEntity>{
        const account = await this.accountRepo.findOne({
            where:{
                role: RoleEnum.ADMIN
            }
        })

        if(!account){
            throw new NotFoundException(`Account can't be found`);
        }

        return account;
    }
}