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
exports.ProductController = void 0;
const openapi = require("@nestjs/swagger");
const page_dto_1 = require("../../../common/dtos/responses/page.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_dto_1 = require("../dtos/responses/product.dto");
const create_product_dto_1 = require("../dtos/requests/create-product.dto");
const update_product_dto_1 = require("../dtos/requests/update-product.dto");
const product_benefit_dto_1 = require("../dtos/responses/product-benefit.dto");
const product_package_dto_1 = require("../dtos/responses/product-package.dto");
const product_page_option_dto_1 = require("../dtos/requests/product-page-option.dto");
let ProductController = class ProductController {
    constructor(productService, productBenefitService, productPackageService) {
        this.productService = productService;
        this.productBenefitService = productBenefitService;
        this.productPackageService = productPackageService;
    }
    getProductList(pageOptions) {
        return this.productService.getAll(pageOptions);
    }
    getProduct(id) {
        return this.productService.getById(id);
    }
    getProductBenefits(id) {
        return this.productBenefitService.getByProductId(id);
    }
    getProductPackages(id) {
        return this.productPackageService.getByProductId(id);
    }
    createProduct(body) {
        return this.productService.create(body, 'test');
    }
    updateProduct(id, body) {
        return this.productService.update(id, body, 'test');
    }
    deleteProduct(id) {
        return this.productService.delete(id, 'test');
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOkResponse)({
        type: (page_dto_1.PageDTO),
        description: 'Got list product successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_page_option_dto_1.ProductPageOptionsDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        type: product_dto_1.ProductDTO,
        description: 'Got product successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Product with id ... can`t be found'
    }),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/product.dto").ProductDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('/:id/benefit'),
    (0, swagger_1.ApiOkResponse)({
        type: product_benefit_dto_1.ProductBenefitDTO,
        isArray: true,
        description: 'Got product benefits successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Product with id ... can`t be found'
    }),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/responses/product-benefit.dto").ProductBenefitDTO] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductBenefits", null);
__decorate([
    (0, common_1.Get)('/:id/package'),
    (0, swagger_1.ApiOkResponse)({
        type: product_package_dto_1.ProductPackageDTO,
        isArray: true,
        description: 'Got product benefits successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Product with id ... can`t be found'
    }),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/responses/product-package.dto").ProductPackageDTO] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductPackages", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.CreateProductDTO }),
    (0, swagger_1.ApiOkResponse)({
        type: product_dto_1.ProductDTO,
        description: 'Create product successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    openapi.ApiResponse({ status: 201, type: require("../dtos/responses/product.dto").ProductDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiBody)({ type: update_product_dto_1.UpdateProductDTO }),
    (0, swagger_1.ApiOkResponse)({
        type: product_dto_1.ProductDTO,
        description: 'Update product successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Product with id ... can`t be found'
    }),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/product.dto").ProductDTO }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Delete product successfully',
        type: product_dto_1.ProductDTO
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Product with id ... can`t be found'
    }),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/product.dto").ProductDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('/v1/product'),
    (0, swagger_1.ApiTags)('Product'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Inject)('IProductService')),
    __param(1, (0, common_1.Inject)('IProductBenefitService')),
    __param(2, (0, common_1.Inject)('IProductPackageService')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map