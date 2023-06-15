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
exports.UpdateProductDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProductDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, brandId: { required: true, type: () => String }, categoryId: { required: true, type: () => String }, imageId: { required: true, type: () => String }, imageDescriptionIds: { required: true, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'Microsoft office'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'description',
        type: 'text',
        example: 'Sản phẩm tốt'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'brandId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    }),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'categoryId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    }),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'imageId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    }),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], UpdateProductDTO.prototype, "imageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'imageIds',
        isArray: true,
        example: ['ff852415-ff06-47d3-a33b-4ad4782cc664']
    }),
    (0, class_validator_1.IsUUID)(4, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProductDTO.prototype, "imageDescriptionIds", void 0);
exports.UpdateProductDTO = UpdateProductDTO;
//# sourceMappingURL=update-product.dto.js.map