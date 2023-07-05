import { AuthModule } from "@modules/auth/auth.module";
import { ImageModule } from "@modules/images/image.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AboutCompanyController } from "./controllers/about-company.controller";
import { AboutCompanyEntity } from "./database/entities/about-company.entity";
import { AboutCompanyRepository } from "./database/repositories/about-company.repository";
import { AboutCompanyService } from "./services/about-company.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            AboutCompanyEntity
        ]),
        AuthModule,
        ImageModule
    ],
    controllers: [AboutCompanyController],
    providers: [
        {
            provide: 'IAboutCompanyRepository',
            useClass: AboutCompanyRepository
        },
        {
            provide: 'IAboutCompanyService',
            useClass: AboutCompanyService
        }
    ],
    exports: [
        'IAboutCompanyRepository',
        'IAboutCompanyService'
    ]
})
export class AboutCompanyModule {}