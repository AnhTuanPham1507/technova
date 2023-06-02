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
exports.ProductPackageEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const currency_enum_1 = require("../../../../constants/enums/currency.enum");
const order_detail_entity_1 = require("../../../orders/database/entities/order-detail.entity");
const typeorm_1 = require("typeorm");
const product_benefit_entity_1 = require("./product-benefit.entity");
const product_entity_1 = require("./product.entity");
let ProductPackageEntity = class ProductPackageEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { price: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../constants/enums/currency.enum").CurrencyEnum }, timeRange: { required: true, type: () => Date }, inStockQuantity: { required: true, type: () => Number }, product: { required: true, type: () => require("./product.entity").ProductEntity }, benefits: { required: true, type: () => [require("./product-benefit.entity").ProductBenefitEntity] }, orderDetails: { required: true, type: () => [require("../../../orders/database/entities/order-detail.entity").OrderDetailEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'price',
        type: 'float'
    }),
    __metadata("design:type", Number)
], ProductPackageEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'currency',
        type: 'enum',
        enum: currency_enum_1.CurrencyEnum
    }),
    __metadata("design:type", String)
], ProductPackageEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'time_range',
        type: 'timestamp with time zone'
    }),
    __metadata("design:type", Date)
], ProductPackageEntity.prototype, "timeRange", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'in_stock_quantity'
    }),
    __metadata("design:type", Number)
], ProductPackageEntity.prototype, "inStockQuantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.packages),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.ProductEntity)
], ProductPackageEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_benefit_entity_1.ProductBenefitEntity, (b) => b.packages),
    __metadata("design:type", Array)
], ProductPackageEntity.prototype, "benefits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetailEntity, (d) => d.productPackage),
    __metadata("design:type", Array)
], ProductPackageEntity.prototype, "orderDetails", void 0);
ProductPackageEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'product_package' })
], ProductPackageEntity);
exports.ProductPackageEntity = ProductPackageEntity;
//# sourceMappingURL=product-package.entity.js.map