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
const image_dto_1 = require("../../../images/dtos/responses/image.dto");
const swagger_1 = require("@nestjs/swagger");
class ProductDTO extends abstract_dto_1.AbstractDTO {
    constructor(product, brandDTO, categoryDTO, imageDTO) {
        super(product);
        this.name = product.name;
        this.description = product.description;
        this.isContactToSell = Boolean(product.isContactToSell);
        this.brand = brandDTO;
        this.category = categoryDTO;
        this.image = imageDTO;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, isContactToSell: { required: true, type: () => Boolean }, brand: { required: false, type: () => require("../../../brands/dtos/responses/brand.dto").BrandDTO }, category: { required: false, type: () => require("../../../categories/dtos/responses/category.dto").CategoryDTO }, image: { required: false, type: () => require("../../../images/dtos/responses/image.dto").ImageDTO } };
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
        name: 'isContactToSell',
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], ProductDTO.prototype, "isContactToSell", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'brand',
        type: brand_dto_1.BrandDTO
    }),
    __metadata("design:type", brand_dto_1.BrandDTO)
], ProductDTO.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'category',
        type: category_dto_1.CategoryDTO
    }),
    __metadata("design:type", category_dto_1.CategoryDTO)
], ProductDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'image',
        type: image_dto_1.ImageDTO
    }),
    __metadata("design:type", image_dto_1.ImageDTO)
], ProductDTO.prototype, "image", void 0);
exports.ProductDTO = ProductDTO;
//# sourceMappingURL=product.dto.js.map