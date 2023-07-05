"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const image_module_1 = require("../images/image.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_controller_1 = require("./controllers/category.controller");
const category_entity_1 = require("./database/entities/category.entity");
const category_repository_1 = require("./database/repositories/category.repository");
const category_service_1 = require("./services/category.service");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                category_entity_1.CategoryEntity
            ]),
            image_module_1.ImageModule,
            auth_module_1.AuthModule
        ],
        providers: [
            {
                provide: 'ICategoryRepository',
                useClass: category_repository_1.CategoryRepository
            },
            {
                provide: 'ICategoryService',
                useClass: category_service_1.CategoryService
            }
        ],
        controllers: [category_controller_1.CategoryController],
        exports: [
            'ICategoryRepository',
            'ICategoryService'
        ]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map