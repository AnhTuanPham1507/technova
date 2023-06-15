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
exports.ImageDTO = void 0;
const openapi = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../common/dtos/abstract.dto");
const image_object_type_enum_1 = require("../../../../constants/enums/image-object-type.enum");
const image_type_enum_1 = require("../../../../constants/enums/image-type.enum");
const swagger_1 = require("@nestjs/swagger");
class ImageDTO extends abstract_dto_1.AbstractDTO {
    constructor(image) {
        super(image);
        this.type = image.type;
        this.path = image.path;
        this.objectId = image.objectId;
        this.objectType = image.objectType;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, type: () => String }, path: { required: true, type: () => String }, objectId: { required: false, type: () => String }, objectType: { required: false, enum: require("../../../../constants/enums/image-object-type.enum").ImageObjectTypeEnum } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'type',
        type: 'eum',
        enum: image_type_enum_1.ImageTypeEnum,
        example: image_type_enum_1.ImageTypeEnum.JPG
    }),
    __metadata("design:type", String)
], ImageDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'path',
        example: 'image/name.jpg'
    }),
    __metadata("design:type", String)
], ImageDTO.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'objectId',
        example: '123-abc'
    }),
    __metadata("design:type", String)
], ImageDTO.prototype, "objectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'objectType',
        type: 'enum',
        enum: image_object_type_enum_1.ImageObjectTypeEnum,
        example: image_object_type_enum_1.ImageObjectTypeEnum.PRODUCT
    }),
    __metadata("design:type", String)
], ImageDTO.prototype, "objectType", void 0);
exports.ImageDTO = ImageDTO;
//# sourceMappingURL=image.dto.js.map