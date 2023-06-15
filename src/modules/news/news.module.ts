import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsController } from "./controllers/news.controller";
import { NewsEntity } from "./database/entities/news.entity";
import { NewsRepository } from "./database/repositories/news.repository";
import { NewsService } from "./services/news.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            NewsEntity
        ]),
    ],
    controllers: [NewsController],
    providers: [
        {
            provide: 'INewsRepository',
            useClass: NewsRepository
        },
        {
            provide: 'INewsService',
            useClass: NewsService
        }
    ],
    exports: [
        'INewsRepository',
        'INewsService'
    ]
})
export class NewsModule {}