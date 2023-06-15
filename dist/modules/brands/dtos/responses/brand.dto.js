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
exports.BrandDTO = void 0;
const openapi = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../common/dtos/abstract.dto");
const image_dto_1 = require("../../../images/dtos/responses/image.dto");
const product_dto_1 = require("../../../products/dtos/responses/product.dto");
const swagger_1 = require("@nestjs/swagger");
class BrandDTO extends abstract_dto_1.AbstractDTO {
    constructor(brand, imagesDTO, productsDTO) {
        super(brand);
        this.name = brand.name;
        this.products = productsDTO;
        this.image = imagesDTO;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, image: { required: false, type: () => require("../../../images/dtos/responses/image.dto").ImageDTO }, products: { required: false, type: () => [require("../../../products/dtos/responses/product.dto").ProductDTO] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'Microsoft'
    }),
    __metadata("design:type", String)
], BrandDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'image',
        type: image_dto_1.ImageDTO
    }),
    __metadata("design:type", image_dto_1.ImageDTO)
], BrandDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'products',
        isArray: true,
        type: product_dto_1.ProductDTO
    }),
    __metadata("design:type", Array)
], BrandDTO.prototype, "products", void 0);
exports.BrandDTO = BrandDTO;
//# sourceMappingURL=brand.dto.js.map