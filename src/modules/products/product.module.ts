import { BrandModule } from "@modules/brands/brand.module";
import { CategoryModule } from "@modules/categories/category.module";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./controllers/product.controller";
import { CommentEntity } from "./database/entities/comment.entity";
import { DiscountEntity } from "./database/entities/discount.entity";
import { ProductBenefitEntity } from "./database/entities/product-benefit.entity";
import { ProductPackageEntity } from "./database/entities/product-package.entity";
import { ProductTagEntity } from "./database/entities/product-tag.entity";
import { ProductEntity } from "./database/entities/product.entity";
import { ReviewEntity } from "./database/entities/review.entity";
import { DiscountRepository } from "./database/repositories/discount.repository";
import { ProductBenefitRepository } from "./database/repositories/product-benefit.repository";
import { ProductPackageRepository } from "./database/repositories/product-package.repository";
import { ProductTagRepository } from "./database/repositories/product-tag.repository";
import { ProductRepository } from "./database/repositories/product.repository";
import { ProductService } from "./services/product.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductBenefitEntity,
            ProductPackageEntity,
            ProductTagEntity,
            CommentEntity,
            DiscountEntity,
            ReviewEntity
        ]),
        forwardRef(() =>BrandModule),
        CategoryModule
    ],
    providers: [
        {
            provide: 'IProductRepository',
            useClass: ProductRepository
        },
        {
            provide: 'IProductBenefitRepository',
            useClass: ProductBenefitRepository
        },
        {
            provide: 'IProductPackageRepository',
            useClass: ProductPackageRepository
        },
        {
            provide: 'IProductTagRepository',
            useClass: ProductTagRepository
        },
        {
            provide: 'IDiscountRepository',
            useClass: DiscountRepository
        },
        {
            provide: 'IProductService',
            useClass: ProductService
        }
    ],
    controllers: [ProductController],
    exports: [
        'IProductService',
        'IDiscountRepository',
        'IProductTagRepository',
        'IProductPackageRepository',
        'IProductBenefitRepository',
        'IProductRepository'
    ]
})
export class ProductModule{}