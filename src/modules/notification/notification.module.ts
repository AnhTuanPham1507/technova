import { AuthModule } from "@modules/auth/auth.module";
import { ClientModule } from "@modules/clients/client.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationController } from "./controllers/notification.controller";
import { NotificationEntity } from "./database/entities/notification.entity";
import { NotificationRepository } from "./database/repositories/notification.repository";
import { NotificationService } from "./services/notification.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationEntity]),
        ClientModule,
        AuthModule
    ],
    providers: [
        {
            provide: 'INotificationRepository',
            useClass: NotificationRepository
        },
        {
            provide: 'INotificationService',
            useClass: NotificationService
        },
    ],
    controllers: [NotificationController],
    exports: [
        'INotificationRepository',
        'INotificationService'
    ]
})
export class NotificationModule {}