import { PageDTO } from "@common/dtos/responses/page.dto";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { IUserService } from "@modules/clients/services/user.service";
import { Inject, Injectable } from "@nestjs/common";
import { UpdateDateColumn } from "typeorm";
import { NotificationEntity } from "../database/entities/notification.entity";
import { INotificationRepository } from "../database/repositories/notification.repository";
import { CreateNotificationDTO } from "../dtos/requests/create-notification.dto";
import { NotificationPageOptionsDTO } from "../dtos/requests/notitication-page-options.dto";
import { NotificationDTO } from "../dtos/responses/notification.dto";

export interface INotificationService {
    create(createNotification: CreateNotificationDTO, account: AccountDTO, createdFor: string | null);
    getAll(pageOptionsDTO: NotificationPageOptionsDTO): Promise<PageDTO<NotificationDTO>>;
    update(id: string, account: AccountDTO): Promise<NotificationDTO>;
    getByOwner(pageOptionsDTO: NotificationPageOptionsDTO, account: AccountDTO): Promise<PageDTO<NotificationDTO>>;
}

@Injectable()
export class NotificationService implements INotificationService{
    constructor(
        @Inject('INotificationRepository')
        private readonly notificationRepo: INotificationRepository,
        @Inject('IUserService')
        private readonly userService: IUserService
    ){}

    async create(createNotification: CreateNotificationDTO, account: AccountDTO, createFor: string | null): Promise<NotificationDTO>{
        const notification = new NotificationEntity();
        notification.content = createNotification.content;
        notification.createdBy = account.id;
        notification.updatedBy = account.id;
        if(createFor)
            notification.createFor = createFor

        const createdNotification = await this.notificationRepo.save(notification);

        return new NotificationDTO(createdNotification);
    }

    async update(id: string, account: AccountDTO): Promise<NotificationDTO>{
        const notification = await this.notificationRepo.getById(id);
        notification.isRead = true;
        notification.updatedBy = account.id;

        const updatedNotification = await this.notificationRepo.save(notification);

        return new NotificationDTO(updatedNotification);
    }

    getAll(pageOptionsDTO: NotificationPageOptionsDTO): Promise<PageDTO<NotificationDTO>>{
        return this.notificationRepo.getAll(pageOptionsDTO);
    }

    async getByOwner(pageOptionsDTO: NotificationPageOptionsDTO, account: AccountDTO): Promise<PageDTO<NotificationDTO>>{
        const user = await this.userService.getByAccountId(account.id);
        return this.notificationRepo.getAll(pageOptionsDTO, user.id);
    }
    
}