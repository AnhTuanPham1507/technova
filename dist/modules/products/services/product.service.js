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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../database/entities/product.entity");
const product_dto_1 = require("../dtos/responses/product.dto");
const my_moment_util_1 = require("../../../utils/my-moment.util");
let ProductService = class ProductService {
    constructor(brandService, categoryService, productRepo, productBenefitRepo, productTagRepo) {
        this.brandService = brandService;
        this.categoryService = categoryService;
        this.productRepo = productRepo;
        this.productBenefitRepo = productBenefitRepo;
        this.productTagRepo = productTagRepo;
    }
    async create(createProduct, userId) {
        const { brandId, categoryId, benefitIds, tagIds, description, name } = createProduct;
        const brand = await this.brandService.getEntityById(brandId);
        const category = await this.categoryService.getEntityById(categoryId);
        const benefits = await this.productBenefitRepo.getByIds(benefitIds);
        const tags = await this.productTagRepo.getByIds(tagIds);
        const product = new product_entity_1.ProductEntity(name, description, brand, category, tags, benefits);
        product.createdBy = userId;
        product.updatedBy = userId;
        const createdProduct = await this.productRepo.save(product);
        const productDTO = new product_dto_1.ProductDTO(createdProduct);
        return productDTO;
    }
    getAll(pageOptions) {
        return this.productRepo.getAll(pageOptions);
    }
    async getById(id) {
        const foundProduct = await this.productRepo.getById(id);
        const productDTO = new product_dto_1.ProductDTO(foundProduct);
        return productDTO;
    }
    async getByIds(ids) {
        const foundProducts = await this.productRepo.getByIds(ids);
        const productsDTO = foundProducts.map(product => new product_dto_1.ProductDTO(product));
        return productsDTO;
    }
    async update(id, updateProduct, userId) {
        const foundProduct = await this.productRepo.getById(id);
        const product = Object.assign(foundProduct, Object.assign(Object.assign({}, updateProduct), { updatedAt: my_moment_util_1.Moment.getCurrentDate(), updatedBy: userId }));
        const updatedProduct = await this.productRepo.save(product);
        const productDTO = new product_dto_1.ProductDTO(updatedProduct);
        return productDTO;
    }
    async delete(id, userId) {
        const foundProduct = await this.productRepo.getById(id);
        const product = Object.assign(foundProduct, Object.assign(Object.assign({}, foundProduct), { deletedAt: my_moment_util_1.Moment.getCurrentDate(), deletedBy: userId }));
        const deletedProduct = await this.productRepo.save(product);
        const productDTO = new product_dto_1.ProductDTO(deletedProduct);
        return productDTO;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => 'IBrandService'))),
    __param(1, (0, common_1.Inject)('ICategoryService')),
    __param(2, (0, common_1.Inject)('IProductRepository')),
    __param(3, (0, common_1.Inject)('IProductBenefitRepository')),
    __param(4, (0, common_1.Inject)('IProductTagRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map