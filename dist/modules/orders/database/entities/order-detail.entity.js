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
exports.OrderDetailEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const product_package_entity_1 = require("../../../products/database/entities/product-package.entity");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let OrderDetailEntity = class OrderDetailEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { price: { required: true, type: () => Number }, quantity: { required: true, type: () => Number }, productName: { required: true, type: () => String }, productPackage: { required: true, type: () => require("../../../products/database/entities/product-package.entity").ProductPackageEntity }, order: { required: true, type: () => require("./order.entity").OrderEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'price',
        type: 'float'
    }),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'quantity',
        type: 'float'
    }),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'productName',
    }),
    __metadata("design:type", String)
], OrderDetailEntity.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_package_entity_1.ProductPackageEntity, (p) => p.orderDetails),
    (0, typeorm_1.JoinColumn)({ name: 'product_package_id' }),
    __metadata("design:type", product_package_entity_1.ProductPackageEntity)
], OrderDetailEntity.prototype, "productPackage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity, (o) => o.details),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_entity_1.OrderEntity)
], OrderDetailEntity.prototype, "order", void 0);
OrderDetailEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'order_detail' })
], OrderDetailEntity);
exports.OrderDetailEntity = OrderDetailEntity;
//# sourceMappingURL=order-detail.entity.js.map