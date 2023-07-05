import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { NotificationPageOptionsDTO } from "@modules/notification/dtos/requests/notitication-page-options.dto";
import { NotificationDTO } from "@modules/notification/dtos/responses/notification.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationEntity } from "../entities/notification.entity";

export interface INotificationRepository {
    save(notification: NotificationEntity): Promise<NotificationEntity>;
    getAll(pageOptionsDTO: NotificationPageOptionsDTO, ownerId?: string): Promise<PageDTO<NotificationDTO>>;
    getById(id: string): Promise<NotificationEntity>;
}

@Injectable()
export class NotificationRepository implements INotificationRepository {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepo: Repository<NotificationEntity>
    ){}

    save(notification: NotificationEntity): Promise<NotificationEntity> {
        return this.notificationRepo.save(notification);
    }

    async getAll(pageOptionsDTO: NotificationPageOptionsDTO, ownerId?: string): Promise<PageDTO<NotificationDTO>> {
        const query = this.notificationRepo.createQueryBuilder('notification');
        query.withDeleted();
    

        switch(pageOptionsDTO.queryType){
          case QueryTypeEnum.ALL:
            break;
          case QueryTypeEnum.ACTIVATE:
            query.andWhere('notification.deleted_at is null');
            break;
          case QueryTypeEnum.DEACTIVATE:
            query.andWhere('notification.deleted_at is not null');
            break;
        }

        if(pageOptionsDTO.isRead !== null && pageOptionsDTO.isRead !== undefined) {
          query.andWhere("notification.isRead = :isRead", {isRead: pageOptionsDTO.isRead})
        }
        
        if(ownerId){
          query.andWhere("notification.createFor = :ownerId",{
            ownerId
          })
        }
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const notificationDTO = result.map((it) => new NotificationDTO(it));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<NotificationDTO>(notificationDTO, pageMetaDto);
    }



    async getById(id: string): Promise<NotificationEntity>{
      const notification = await this.notificationRepo.findOne({
        where: {
          id
        }
      })

      if(!notification) {
        throw new NotFoundException(`Notitfication can't be found`)
      }

      return notification;
    }
}