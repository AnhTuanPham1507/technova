import { AbstractEntity } from "@common/abstract.entity";
import { Column, Entity} from "typeorm";

@Entity({name: 'notification'})
export class NotificationEntity extends AbstractEntity {

    @Column({
        name: 'content',
        type: 'text'
    })
    content: string;

    @Column({
        name: 'is_read',
        type: 'boolean',
        default: false
    })
    isRead: boolean;
}