import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { UserEntity } from "@modules/clients/database/entities/user.entity";
import { IUserService } from "@modules/clients/services/user.service";
import { Inject, Injectable } from "@nestjs/common";
import { NotificationEntity } from "../database/entities/notification.entity";
import { INotificationRepository } from "../database/repositories/notification.repository";
import { CreateNotificationDTO } from "../dtos/requests/create-notification.dto";
import { NotificationDTO } from "../dtos/responses/notification.dto";

export interface INotificationService {
    create(createNotification: CreateNotificationDTO, account: AccountDTO): Promise<NotificationDTO>;
    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NotificationDTO>>;
}

@Injectable()
export class NotificationService implements INotificationService{
    constructor(
        @Inject('INotificationRepository')
        private readonly notificationRepo: INotificationRepository,

        @Inject('IUserService')
        private readonly userService: IUserService
    ){}

    async create(createNotification: CreateNotificationDTO, account: AccountDTO): Promise<NotificationDTO>{
        const notification = new NotificationEntity();
        notification.content = createNotification.content;
        notification.createdBy = account.id;
        notification.updatedBy = account.id;

        const createdNotification = await this.notificationRepo.save(notification);

        return new NotificationDTO(createdNotification);
    }

    getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<NotificationDTO>>{
        return this.notificationRepo.getAll(pageOptionsDTO);
    }
    
}