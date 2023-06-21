import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageMetaDTO } from "@common/dtos/responses/page-meta.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { NotificationDTO } from "@modules/notification/dtos/responses/notification.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationEntity } from "../entities/notification.entity";

export interface INotificationRepository {
    save(notification: NotificationEntity): Promise<NotificationEntity>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NotificationDTO>>;
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

    async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NotificationDTO>> {
        const query = this.notificationRepo.createQueryBuilder('notification');
        query.leftJoinAndSelect('notification.user','user')
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
        
    
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
    
        const itemCount = await query.getCount();
        const result = await query.getMany();
    
    
        const notificationDTO = result.map((it) => new NotificationDTO(it, it.user ? it.user.name : ''));
        const pageMetaDto = new PageMetaDTO({ pageOptionsDTO, itemCount });
    
        return new PageDTO<NotificationDTO>(notificationDTO, pageMetaDto);
    }
}