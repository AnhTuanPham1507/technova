import { ImageModule } from "@modules/images/image.module";
import { ProductModule } from "@modules/products/product.module";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandController } from "./controllers/brand.controller";
import { BrandEntity } from "./database/entities/brand.entity";
import { BrandRepository } from "./database/repositories/brand.repository";
import { BrandService } from "./services/brand.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BrandEntity
        ]),
        forwardRef(() => ProductModule),
        ImageModule
    ],
    providers: [
        {
            provide: 'IBrandRepository',
            useClass: BrandRepository
        },
        {
            provide: 'IBrandService',
            useClass: BrandService
        }
    ],
    controllers: [BrandController],
    exports: [
        'IBrandRepository',
        'IBrandService'
    ]
})
export class BrandModule {}