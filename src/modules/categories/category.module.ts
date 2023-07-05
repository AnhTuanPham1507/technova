import { AuthModule } from "@modules/auth/auth.module";
import { ImageModule } from "@modules/images/image.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./controllers/category.controller";
import { CategoryEntity } from "./database/entities/category.entity";
import { CategoryRepository } from "./database/repositories/category.repository";
import { CategoryService } from "./services/category.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoryEntity
        ]),
        ImageModule,
        AuthModule
    ],
    providers: [
        {
            provide: 'ICategoryRepository',
            useClass: CategoryRepository
        },
        {
            provide: 'ICategoryService',
            useClass: CategoryService
        }
    ],
    controllers: [CategoryController],
    exports: [
        'ICategoryRepository',
        'ICategoryService'
    ]
})
export class CategoryModule {}