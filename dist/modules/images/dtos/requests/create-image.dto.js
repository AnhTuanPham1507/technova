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
exports.CreateImageDTO = void 0;
const openapi = require("@nestjs/swagger");
const image_object_type_enum_1 = require("../../../../constants/enums/image-object-type.enum");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateImageDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { fileName: { required: true, type: () => String }, mimetype: { required: true, type: () => String }, originalname: { required: true, type: () => String }, size: { required: true, type: () => Number }, path: { required: true, type: () => String }, buffer: { required: true, type: () => String }, objectId: { required: true, type: () => String }, objectType: { required: true, enum: require("../../../../constants/enums/image-object-type.enum").ImageObjectTypeEnum } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'fileName',
        example: 'abc',
    }),
    (0, class_validator_1.IsString)({
        message: 'fileName is required',
    }),
    __metadata("design:type", String)
], CreateImageDTO.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'mimeType',
        example: 'pdf',
    }),
    (0, class_validator_1.IsString)({
        message: 'mimeType is required',
    }),
    __metadata("design:type", String)
], CreateImageDTO.prototype, "mimetype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'originalName',
        example: 'abc',
    }),
    (0, class_validator_1.IsString)({
        message: 'originalName is required',
    }),
    __metadata("design:type", String)
], CreateImageDTO.prototype, "originalname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'size',
        example: 2,
    }),
    (0, class_validator_1.IsInt)({
        message: 'size is required',
    }),
    __metadata("design:type", Number)
], CreateImageDTO.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'path',
        example: 'abc',
    }),
    (0, class_validator_1.IsString)({
        message: 'path is required',
    }),
    __metadata("design:type", String)
], CreateImageDTO.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'buffer',
        example: 'abc',
    }),
    (0, class_validator_1.IsString)({
        message: 'path is required',
    }),
    __metadata("design:type", String)
], CreateImageDTO.prototype, "buffer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'objectId',
        example: '123-abc'
    }),
    __metadata("design:type", String)
], CreateImageDTO.prototype, "objectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'objectType',
        type: 'enum',
        enum: image_object_type_enum_1.ImageObjectTypeEnum,
        example: image_object_type_enum_1.ImageObjectTypeEnum.PRODUCT
    }),
    __metadata("design:type", String)
], CreateImageDTO.prototype, "objectType", void 0);
exports.CreateImageDTO = CreateImageDTO;
//# sourceMappingURL=create-image.dto.js.map