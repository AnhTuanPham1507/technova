import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { UserDTO } from "@modules/clients/dtos/responses/user.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    getById(id: string): Promise<UserEntity>;
    save(user: UserEntity): Promise<UserEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<UserDTO>>;
    getByAccountId(accountId: string): Promise<UserEntity>;
}

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ){}

    async getById(id: string): Promise<UserEntity> {
        const user = await this.userRepo.findOne({
            where:{
                id
            },
            relations: ['account']
        })

        if(!user){
            throw new NotFoundException(`User with id ${id} can't be found`);
        }

        return user;
    }

    async getByAccountId(accountId: string): Promise<UserEntity> {
      const user = await this.userRepo.findOne({
          where:{
              account: {
                id: accountId
              },
          },
          relations: ['account']
      })

      if(!user){
          throw new NotFoundException(`User  can't be found`);
      }

      return user;
  }

    save(user: UserEntity): Promise<UserEntity> {
        return this.userRepo.save(user);
    }

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<UserDTO>> {
        const query = this.userRepo.createQueryBuilder('user');
        query.leftJoinAndSelect('user.account','account')
        query.withDeleted();
    
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
          query.andWhere('(user.name ILIKE :q)', {
            q: `%${pageOptionsDTO.q}%`,
          });
        }

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('user.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('user.deleted_at is not null');
            break;
        }
        
        query.orderBy(`user.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const productDTO = result.map((it) => new UserDTO(it, it.account.email));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<UserDTO>(productDTO, pageMetaDto);
    }
}