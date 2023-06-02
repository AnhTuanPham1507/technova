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
exports.CategoryDTO = void 0;
const openapi = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../common/dtos/abstract.dto");
const product_dto_1 = require("../../../products/dtos/responses/product.dto");
const swagger_1 = require("@nestjs/swagger");
class CategoryDTO extends abstract_dto_1.AbstractDTO {
    constructor(category) {
        super(category);
        this.name = category.name;
        this.products = category.products ? category.products.map(product => new product_dto_1.ProductDTO(product)) : [];
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, products: { required: true, type: () => [require("../../../products/dtos/responses/product.dto").ProductDTO] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'Phần mềm'
    }),
    __metadata("design:type", String)
], CategoryDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'products',
        type: product_dto_1.ProductDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], CategoryDTO.prototype, "products", void 0);
exports.CategoryDTO = CategoryDTO;
//# sourceMappingURL=category.dto.js.map