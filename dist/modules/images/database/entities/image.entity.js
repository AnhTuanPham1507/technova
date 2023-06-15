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
exports.ImageEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const image_object_type_enum_1 = require("../../../../constants/enums/image-object-type.enum");
const image_type_enum_1 = require("../../../../constants/enums/image-type.enum");
const typeorm_1 = require("typeorm");
let ImageEntity = class ImageEntity extends abstract_entity_1.AbstractEntity {
    constructor(type, path, cloudinaryId, userId, objectId, objectType) {
        super();
        this.type = type;
        this.path = path;
        this.objectId;
        objectId;
        this.objectType = objectType;
        this.cloudinaryId = cloudinaryId;
        this.createdBy = userId;
        this.updatedBy = userId;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, type: () => String }, path: { required: true, type: () => String }, objectId: { required: false, type: () => String }, objectType: { required: false, enum: require("../../../../constants/enums/image-object-type.enum").ImageObjectTypeEnum }, cloudinaryId: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        enum: image_type_enum_1.ImageTypeEnum,
        type: 'enum'
    }),
    __metadata("design:type", String)
], ImageEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'path'
    }),
    __metadata("design:type", String)
], ImageEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'object_id',
        nullable: true
    }),
    __metadata("design:type", String)
], ImageEntity.prototype, "objectId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'object_type',
        type: 'enum',
        enum: image_object_type_enum_1.ImageObjectTypeEnum,
        nullable: true
    }),
    __metadata("design:type", String)
], ImageEntity.prototype, "objectType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cloudinary_id',
        nullable: true
    }),
    __metadata("design:type", String)
], ImageEntity.prototype, "cloudinaryId", void 0);
ImageEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'image' }),
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], ImageEntity);
exports.ImageEntity = ImageEntity;
//# sourceMappingURL=image.entity.js.map