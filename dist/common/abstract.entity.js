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
exports.AbstractEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
class AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, createdBy: { required: true, type: () => String }, updatedBy: { required: true, type: () => String }, deletedBy: { required: false, type: () => String } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AbstractEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp with time zone',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp with time zone',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp with time zone',
        name: 'deleted_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_by',
        nullable: true
    }),
    __metadata("design:type", String)
], AbstractEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_by',
        nullable: true
    }),
    __metadata("design:type", String)
], AbstractEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'deleted_by',
        nullable: true
    }),
    __metadata("design:type", String)
], AbstractEntity.prototype, "deletedBy", void 0);
exports.AbstractEntity = AbstractEntity;
//# sourceMappingURL=abstract.entity.js.map