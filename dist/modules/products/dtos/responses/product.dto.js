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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDTO = void 0;
const openapi = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../common/dtos/abstract.dto");
const brand_dto_1 = require("../../../brands/dtos/responses/brand.dto");
const category_dto_1 = require("../../../categories/dtos/responses/category.dto");
const swagger_1 = require("@nestjs/swagger");
const comment_dto_1 = require("./comment.dto");
const discount_dto_1 = require("./discount.dto");
const product_benefit_dto_1 = require("./product-benefit.dto");
const product_package_dto_1 = require("./product-package.dto");
const product_tag_dto_1 = require("./product-tag.dto");
const review_dto_1 = require("./review.dto");
class ProductDTO extends abstract_dto_1.AbstractDTO {
    constructor(product) {
        super(product);
        this.name = product.name;
        this.description = product.description;
        this.brand = product.brand ? new brand_dto_1.BrandDTO(product.brand) : null;
        this.category = product.category ? new category_dto_1.CategoryDTO(product.category) : null;
        this.discount = product.discount ? new discount_dto_1.DiscountDTO(product.discount) : null;
        this.benefits = product.benefits.map(benefit => new product_benefit_dto_1.ProductBenefitDTO(benefit));
        this.comments = product.comments.map(comment => new comment_dto_1.CommentDTO(comment));
        this.packages = product.packages.map(productPackage => new product_package_dto_1.ProductPackageDTO(productPackage));
        this.reviews = product.reviews.map(review => new review_dto_1.ReviewDTO(review));
        this.tags = product.tags.map(tag => new product_tag_dto_1.ProductTagDTO(tag));
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, brand: { required: true, type: () => require("../../../brands/dtos/responses/brand.dto").BrandDTO, nullable: true }, category: { required: true, type: () => require("../../../categories/dtos/responses/category.dto").CategoryDTO, nullable: true }, discount: { required: true, type: () => require("./discount.dto").DiscountDTO, nullable: true }, tags: { required: true, type: () => [require("./product-tag.dto").ProductTagDTO] }, benefits: { required: true, type: () => [require("./product-benefit.dto").ProductBenefitDTO] }, packages: { required: true, type: () => [require("./product-package.dto").ProductPackageDTO] }, reviews: { required: true, type: () => [require("./review.dto").ReviewDTO] }, comments: { required: true, type: () => [require("./comment.dto").CommentDTO] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'Microsoft office'
    }),
    __metadata("design:type", String)
], ProductDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'description',
        type: 'text',
        example: 'Sản phẩm tốt'
    }),
    __metadata("design:type", String)
], ProductDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'brand',
        type: brand_dto_1.BrandDTO
    }),
    __metadata("design:type", Object)
], ProductDTO.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'category',
        type: category_dto_1.CategoryDTO
    }),
    __metadata("design:type", Object)
], ProductDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'discount',
        type: discount_dto_1.DiscountDTO
    }),
    __metadata("design:type", Object)
], ProductDTO.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'tags',
        type: product_tag_dto_1.ProductTagDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], ProductDTO.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'benefits',
        type: product_benefit_dto_1.ProductBenefitDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], ProductDTO.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'packages',
        type: product_package_dto_1.ProductPackageDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], ProductDTO.prototype, "packages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'reviews',
        type: review_dto_1.ReviewDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], ProductDTO.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'comments',
        type: comment_dto_1.CommentDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], ProductDTO.prototype, "comments", void 0);
exports.ProductDTO = ProductDTO;
//# sourceMappingURL=product.dto.js.map