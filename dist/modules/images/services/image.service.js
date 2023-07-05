"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const my_moment_util_1 = require("../../../utils/my-moment.util");
const common_1 = require("@nestjs/common");
const image_entity_1 = require("../database/entities/image.entity");
const image_dto_1 = require("../dtos/responses/image.dto");
let ImageService = class ImageService {
    constructor(cloudinaryService, imageRepo) {
        this.cloudinaryService = cloudinaryService;
        this.imageRepo = imageRepo;
    }
    getAllEntity() {
        return this.imageRepo.getAll();
    }
    async getByObject(objectId, objectType, queryType) {
        const images = await this.imageRepo.getByObjectId(objectId, objectType, queryType);
        return images.map(image => new image_dto_1.ImageDTO(image));
    }
    async create(createImage, userId) {
        const result = await this.cloudinaryService.uploadFiles(createImage);
        const images = result.map(item => new image_entity_1.ImageEntity(`${item.resource_type}/${item.format}`, item.secure_url, item.public_id, userId));
        const createImages = await this.imageRepo.saveMany(images);
        const imagesDTO = createImages.map(image => new image_dto_1.ImageDTO(image));
        return imagesDTO;
    }
    async update(updateImage, userId) {
        const foundImages = await this.imageRepo.getByIds(updateImage.imageIds);
        const updateImages = foundImages.map(image => Object.assign(image, {
            objectId: updateImage.objectId,
            objectType: updateImage.objectType,
            updatedBy: userId,
            updatedAt: my_moment_util_1.Moment.getCurrentDate()
        }));
        const images = await this.imageRepo.saveMany(updateImages);
        const imagesDTO = images.map(image => new image_dto_1.ImageDTO(image));
        return imagesDTO;
    }
    async delete(imageId) {
        const foundImage = await this.imageRepo.getById(imageId);
        await this.cloudinaryService.deleteFile(foundImage.cloudinaryId);
        await this.imageRepo.delete(imageId);
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICloudinaryService')),
    __param(1, (0, common_1.Inject)('IImageRepository')),
    __metadata("design:paramtypes", [Object, Object])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map