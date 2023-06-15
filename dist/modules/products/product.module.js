"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const brand_module_1 = require("../brands/brand.module");
const category_module_1 = require("../categories/category.module");
const image_module_1 = require("../images/image.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const benefit_value_controller_1 = require("./controllers/benefit-value.controller");
const product_benefit_controller_1 = require("./controllers/product-benefit.controller");
const product_package_controller_1 = require("./controllers/product-package.controller");
const product_controller_1 = require("./controllers/product.controller");
const benefit_value_entity_1 = require("./database/entities/benefit-value.entity");
const discount_entity_1 = require("./database/entities/discount.entity");
const product_benefit_entity_1 = require("./database/entities/product-benefit.entity");
const product_package_entity_1 = require("./database/entities/product-package.entity");
const product_tag_entity_1 = require("./database/entities/product-tag.entity");
const product_entity_1 = require("./database/entities/product.entity");
const benefit_value_repository_1 = require("./database/repositories/benefit-value.repository");
const discount_repository_1 = require("./database/repositories/discount.repository");
const product_benefit_repository_1 = require("./database/repositories/product-benefit.repository");
const product_package_repository_1 = require("./database/repositories/product-package.repository");
const product_tag_repository_1 = require("./database/repositories/product-tag.repository");
const product_repository_1 = require("./database/repositories/product.repository");
const benefit_value_service_1 = require("./services/benefit-value.service");
const product_benefit_service_1 = require("./services/product-benefit.service");
const product_package_service_1 = require("./services/product-package.service");
const product_service_1 = require("./services/product.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.ProductEntity,
                product_benefit_entity_1.ProductBenefitEntity,
                product_package_entity_1.ProductPackageEntity,
                product_tag_entity_1.ProductTagEntity,
                discount_entity_1.DiscountEntity,
                benefit_value_entity_1.BenefitValueEntity
            ]),
            (0, common_1.forwardRef)(() => brand_module_1.BrandModule),
            category_module_1.CategoryModule,
            image_module_1.ImageModule
        ],
        providers: [
            {
                provide: 'IProductRepository',
                useClass: product_repository_1.ProductRepository
            },
            {
                provide: 'IProductBenefitRepository',
                useClass: product_benefit_repository_1.ProductBenefitRepository
            },
            {
                provide: 'IProductPackageRepository',
                useClass: product_package_repository_1.ProductPackageRepository
            },
            {
                provide: 'IProductTagRepository',
                useClass: product_tag_repository_1.ProductTagRepository
            },
            {
                provide: 'IDiscountRepository',
                useClass: discount_repository_1.DiscountRepository
            },
            {
                provide: 'IBenefitValueRepository',
                useClass: benefit_value_repository_1.BenefitValueRepository
            },
            {
                provide: 'IProductService',
                useClass: product_service_1.ProductService
            },
            {
                provide: 'IProductBenefitService',
                useClass: product_benefit_service_1.ProductBenefitService
            },
            {
                provide: 'IProductPackageService',
                useClass: product_package_service_1.ProductPackageService
            },
            {
                provide: 'IBenefitValueService',
                useClass: benefit_value_service_1.BenefitValueService
            },
        ],
        controllers: [product_controller_1.ProductController, product_package_controller_1.ProductPackageController, product_benefit_controller_1.ProductBenefitController, benefit_value_controller_1.BenefitValueController],
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
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map