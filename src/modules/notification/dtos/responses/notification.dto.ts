import { AbstractDTO } from "@common/dtos/abstract.dto";
import { NotificationEntity } from "@modules/notification/database/entities/notification.entity";
import { ApiProperty } from "@nestjs/swagger";

export class NotificationDTO extends AbstractDTO {
    @ApiProperty({
        name: 'content'
    })
    content: string;

    @ApiProperty({
        name: 'isRead'
    })
    isRead: boolean;

    constructor(notification: NotificationEntity){
        super(notification);
        this.content = notification.content;
        this.isRead = notification.isRead;
    }
}