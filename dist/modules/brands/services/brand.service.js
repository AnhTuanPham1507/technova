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
exports.BrandService = void 0;
const my_moment_util_1 = require("../../../utils/my-moment.util");
const image_object_type_enum_1 = require("../../../constants/enums/image-object-type.enum");
const query_type_enum_1 = require("../../../constants/enums/query-type.enum");
const update_image_dto_1 = require("../../images/dtos/requests/update-image.dto");
const common_1 = require("@nestjs/common");
const brand_entity_1 = require("../database/entities/brand.entity");
const brand_dto_1 = require("../dtos/responses/brand.dto");
let BrandService = class BrandService {
    constructor(brandRepo, imageService) {
        this.brandRepo = brandRepo;
        this.imageService = imageService;
    }
    getEntityById(id) {
        return this.brandRepo.getById(id);
    }
    async getById(id) {
        const foundBrand = await this.brandRepo.getById(id);
        const brandDTO = new brand_dto_1.BrandDTO(foundBrand);
        return brandDTO;
    }
    async getAll(pageOptionsDTO) {
        const pageBrandsDTO = await this.brandRepo.getAll(pageOptionsDTO);
        const mappedImageBrands = await Promise.all(pageBrandsDTO.data.map(async (brand) => {
            const images = await this.imageService.getByObject(brand.id, image_object_type_enum_1.ImageObjectTypeEnum.BRAND, query_type_enum_1.QueryTypeEnum.ALL);
            brand.image = images[0];
            return brand;
        }));
        pageBrandsDTO.data = mappedImageBrands;
        return pageBrandsDTO;
    }
    async create(createBrand, userId) {
        const { name, imageId } = createBrand;
        const brand = new brand_entity_1.BrandEntity(name, new Array());
        brand.createdBy = userId;
        brand.updatedBy = userId;
        const createdBrand = await this.brandRepo.save(brand);
        const assignImage = Object.assign(new update_image_dto_1.UpdateImageDTO, {
            imageIds: [imageId],
            objectId: createdBrand.id,
            objectType: image_object_type_enum_1.ImageObjectTypeEnum.BRAND
        });
        console.log(assignImage);
        const images = await this.imageService.update(assignImage, userId);
        const brandDTO = new brand_dto_1.BrandDTO(createdBrand, images[0]);
        return brandDTO;
    }
    async update(id, updateBrand, userId) {
        const foundBrand = await this.brandRepo.getById(id);
        const brand = Object.assign(foundBrand, Object.assign(Object.assign({}, updateBrand), { updatedAt: my_moment_util_1.Moment.getCurrentDate(), updatedBy: userId }));
        const updatedBrand = await this.brandRepo.save(brand);
        const assignImage = Object.assign(new update_image_dto_1.UpdateImageDTO, {
            imageIds: [updateBrand.imageId],
            objectId: updatedBrand.id,
            objectType: image_object_type_enum_1.ImageObjectTypeEnum.BRAND
        });
        const images = await this.imageService.update(assignImage, userId);
        const brandDTO = new brand_dto_1.BrandDTO(updatedBrand, images[0]);
        return brandDTO;
    }
    async delete(id, userId) {
        const foundBrand = await this.brandRepo.getById(id);
        const brand = Object.assign(foundBrand, {
            deletedAt: my_moment_util_1.Moment.getCurrentDate(),
            deletedBy: userId
        });
        const deletedBrand = await this.brandRepo.save(brand);
        const brandDTO = new brand_dto_1.BrandDTO(deletedBrand);
        return brandDTO;
    }
};
BrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IBrandRepository')),
    __param(1, (0, common_1.Inject)('IImageService')),
    __metadata("design:paramtypes", [Object, Object])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=brand.service.js.map