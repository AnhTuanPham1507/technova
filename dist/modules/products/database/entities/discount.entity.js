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
exports.DiscountEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const discount_status_enum_1 = require("../../../../constants/enums/discount-status.enum");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let DiscountEntity = class DiscountEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { discountPercent: { required: true, type: () => Number }, status: { required: true, enum: require("../../../../constants/enums/discount-status.enum").discountStatusEnum }, expiredDate: { required: true, type: () => Date }, product: { required: true, type: () => require("./product.entity").ProductEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'percent',
        type: 'float'
    }),
    __metadata("design:type", Number)
], DiscountEntity.prototype, "discountPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: discount_status_enum_1.discountStatusEnum
    }),
    __metadata("design:type", String)
], DiscountEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'expired_date',
        type: 'timestamp with time zone'
    }),
    __metadata("design:type", Date)
], DiscountEntity.prototype, "expiredDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.ProductEntity, (product) => product.discount),
    __metadata("design:type", product_entity_1.ProductEntity)
], DiscountEntity.prototype, "product", void 0);
DiscountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'discount' })
], DiscountEntity);
exports.DiscountEntity = DiscountEntity;
//# sourceMappingURL=discount.entity.js.map