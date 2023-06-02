"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const cloudinary_service_1 = require("./services/cloudinary.service");
let ImageModule = class ImageModule {
};
ImageModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            {
                provide: 'CLOUDINARY',
                useFactory: () => {
                    return cloudinary_1.v2.config({
                        cloud_name: process.env.CLOUDINARY_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                    });
                },
            },
            {
                provide: 'ICloudinaryService',
                useClass: cloudinary_service_1.CloudinaryService
            }
        ],
        controllers: [],
        exports: [
            'CLOUDINARY',
            'ICloudinaryService'
        ]
    })
], ImageModule);
exports.ImageModule = ImageModule;
//# sourceMappingURL=image.module.js.map