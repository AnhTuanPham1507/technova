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
exports.CreateProductDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, brandId: { required: true, type: () => String }, categoryId: { required: true, type: () => String }, tagIds: { required: true, type: () => [String] }, benefitIds: { required: true, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'Microsoft office'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'description',
        type: 'text',
        example: 'Sản phẩm tốt'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'brandId',
        type: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'categoryId',
        type: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'tagIds',
        isArray: true
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "tagIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'benefitIds',
        isArray: true
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "benefitIds", void 0);
exports.CreateProductDTO = CreateProductDTO;
//# sourceMappingURL=create-product.dto.js.map