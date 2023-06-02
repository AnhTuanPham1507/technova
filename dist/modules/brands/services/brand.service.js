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
const common_1 = require("@nestjs/common");
const brand_entity_1 = require("../database/entities/brand.entity");
const brand_dto_1 = require("../dtos/responses/brand.dto");
let BrandService = class BrandService {
    constructor(brandRepo, productService) {
        this.brandRepo = brandRepo;
        this.productService = productService;
    }
    getEntityById(id) {
        return this.brandRepo.getById(id);
    }
    async getById(id) {
        const foundBrand = await this.brandRepo.getById(id);
        const brandDTO = new brand_dto_1.BrandDTO(foundBrand);
        return brandDTO;
    }
    async getAll(queryType) {
        const brands = await this.brandRepo.getAll(queryType);
        const brandsDTO = brands.map(brand => new brand_dto_1.BrandDTO(brand));
        return brandsDTO;
    }
    async create(createBrand, userId) {
        const { name } = createBrand;
        const brand = new brand_entity_1.BrandEntity(name, new Array());
        brand.createdBy = userId;
        brand.updatedBy = userId;
        const createdBrand = await this.brandRepo.save(brand);
        const brandDTO = new brand_dto_1.BrandDTO(createdBrand);
        return brandDTO;
    }
    async update(id, updateBrand, userId) {
        const foundBrand = await this.brandRepo.getById(id);
        const foundProducts = await this.productService.getByIds(updateBrand.productIds);
        const brand = Object.assign(foundBrand, Object.assign(Object.assign({}, updateBrand), { products: foundProducts, updatedAt: my_moment_util_1.Moment.getCurrentDate(), updatedBy: userId }));
        const updatedBrand = await this.brandRepo.save(brand);
        const brandDTO = new brand_dto_1.BrandDTO(updatedBrand);
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
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => 'IProductService'))),
    __metadata("design:paramtypes", [Object, Object])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=brand.service.js.map