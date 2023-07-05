"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cloudinary_1 = require("cloudinary");
const image_controller_1 = require("./controllers/image.controller");
const image_entity_1 = require("./database/entities/image.entity");
const image_repository_1 = require("./database/repositories/image.repository");
const cloudinary_service_1 = require("./services/cloudinary.service");
const image_service_1 = require("./services/image.service");
let ImageModule = class ImageModule {
};
ImageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                image_entity_1.ImageEntity
            ]),
            auth_module_1.AuthModule
        ],
        providers: [
            {
                provide: 'CLOUDINARY',
                useFactory: () => {
                    return cloudinary_1.v2.config({
                        cloud_name: 'quanglong1150',
                        api_key: '527374515711284',
                        api_secret: '2kA3NFsnfQyHcPkLoVjBjCsMhCo'
                    });
                },
            },
            {
                provide: 'IImageRepository',
                useClass: image_repository_1.ImageRepository
            },
            {
                provide: 'ICloudinaryService',
                useClass: cloudinary_service_1.CloudinaryService
            },
            {
                provide: 'IImageService',
                useClass: image_service_1.ImageService
            }
        ],
        controllers: [image_controller_1.ImageController],
        exports: [
            'CLOUDINARY',
            'ICloudinaryService',
            'IImageService',
            'IImageRepository'
        ]
    })
], ImageModule);
exports.ImageModule = ImageModule;
//# sourceMappingURL=image.module.js.map