"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModule = void 0;
const product_module_1 = require("../products/product.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const brand_controller_1 = require("./controllers/brand.controller");
const brand_entity_1 = require("./database/entities/brand.entity");
const brand_repository_1 = require("./database/repositories/brand.repository");
const brand_service_1 = require("./services/brand.service");
let BrandModule = class BrandModule {
};
BrandModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                brand_entity_1.BrandEntity
            ]),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule)
        ],
        providers: [
            {
                provide: 'IBrandRepository',
                useClass: brand_repository_1.BrandRepository
            },
            {
                provide: 'IBrandService',
                useClass: brand_service_1.BrandService
            }
        ],
        controllers: [brand_controller_1.BrandController],
        exports: [
            'IBrandRepository',
            'IBrandService'
        ]
    })
], BrandModule);
exports.BrandModule = BrandModule;
//# sourceMappingURL=brand.module.js.map