import { AuthModule } from "@modules/auth/auth.module";
import { BrandModule } from "@modules/brands/brand.module";
import { CategoryModule } from "@modules/categories/category.module";
import { ImageModule } from "@modules/images/image.module";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BenefitValueController } from "./controllers/benefit-value.controller";
import { ProductBenefitController } from "./controllers/product-benefit.controller";
import { ProductPackageController } from "./controllers/product-package.controller";
import { ProductController } from "./controllers/product.controller";
import { BenefitValueEntity } from "./database/entities/benefit-value.entity";
import { DiscountEntity } from "./database/entities/discount.entity";
import { ProductBenefitEntity } from "./database/entities/product-benefit.entity";
import { ProductPackageEntity } from "./database/entities/product-package.entity";
import { ProductTagEntity } from "./database/entities/product-tag.entity";
import { ProductEntity } from "./database/entities/product.entity";
import { BenefitValueRepository } from "./database/repositories/benefit-value.repository";
import { DiscountRepository } from "./database/repositories/discount.repository";
import { ProductBenefitRepository } from "./database/repositories/product-benefit.repository";
import { ProductPackageRepository } from "./database/repositories/product-package.repository";
import { ProductTagRepository } from "./database/repositories/product-tag.repository";
import { ProductRepository } from "./database/repositories/product.repository";
import { BenefitValueService } from "./services/benefit-value.service";
import { ProductBenefitService } from "./services/product-benefit.service";
import { ProductPackageService } from "./services/product-package.service";
import { ProductService } from "./services/product.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductBenefitEntity,
            ProductPackageEntity,
            ProductTagEntity,
            DiscountEntity,
            BenefitValueEntity
        ]),
        forwardRef(() =>BrandModule),
        CategoryModule,
        ImageModule,
        AuthModule
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
            provide: 'IBenefitValueRepository',
            useClass: BenefitValueRepository
        },
        {
            provide: 'IProductService',
            useClass: ProductService
        },
        {
            provide: 'IProductBenefitService',
            useClass: ProductBenefitService
        },
        {
            provide: 'IProductPackageService',
            useClass: ProductPackageService
        },
        {
            provide: 'IBenefitValueService',
            useClass: BenefitValueService
        },
    ],
    controllers: [ProductController, ProductPackageController, ProductBenefitController, BenefitValueController],
    exports: [
        'IProductService',
        'IProductPackageService',
        'IProductBenefitService',
        'IBenefitValueService',
        'IDiscountRepository',
        'IProductTagRepository',
        'IProductPackageRepository',
        'IProductBenefitRepository',
        'IProductRepository',
        'IBenefitValueRepository'
    ]
})
export class ProductModule{}