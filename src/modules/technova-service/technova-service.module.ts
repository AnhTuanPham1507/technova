import { AuthModule } from "@modules/auth/auth.module";
import { ImageModule } from "@modules/images/image.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TechnovaServiceController } from "./controllers/technova-service.controller";
import { TechnovaServiceEntity } from "./database/entities/technova-service.entity";
import { TechnovaServiceRepository } from "./database/repositories/technova-service.repository";
import { TechnovaServiceService } from "./services/technova-service.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            TechnovaServiceEntity
        ]),
        AuthModule,
        ImageModule
    ],
    controllers: [TechnovaServiceController],
    providers: [
        {
            provide: 'ITechnovaServiceRepository',
            useClass: TechnovaServiceRepository
        },
        {
            provide: 'ITechnovaServiceService',
            useClass: TechnovaServiceService
        }
    ],
    exports: [
        'ITechnovaServiceRepository',
        'ITechnovaServiceService'
    ]
})
export class TechnovaServiceModule {}