import { AuthModule } from "@modules/auth/auth.module";
import { ImageModule } from "@modules/images/image.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannerController } from "./controllers/banner.controller";
import { BannerEntity } from "./database/entities/banner.entity";
import { BannerRepository } from "./database/repositories/banner.repository";
import { BannerService } from "./services/banner.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            BannerEntity
        ]),
        AuthModule,
        ImageModule
    ],
    controllers: [BannerController],
    providers: [
        {
            provide: 'IBannerRepository',
            useClass: BannerRepository
        },
        {
            provide: 'IBannerService',
            useClass: BannerService
        }
    ],
    exports: [
        'IBannerRepository',
        'IBannerService'
    ]
})
export class BannerModule {}