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