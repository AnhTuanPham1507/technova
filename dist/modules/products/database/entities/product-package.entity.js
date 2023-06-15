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
const time_range_enum_1 = require("../../../../constants/enums/time-range.enum");
const order_detail_entity_1 = require("../../../orders/database/entities/order-detail.entity");
const typeorm_1 = require("typeorm");
const benefit_value_entity_1 = require("./benefit-value.entity");
const product_entity_1 = require("./product.entity");
let ProductPackageEntity = class ProductPackageEntity extends abstract_entity_1.AbstractEntity {
    constructor(name, price, currency, userNumber, timeRange, timeRangeNumber, product) {
        super();
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.product = product;
        this.userNumber = userNumber;
        this.timeRange = timeRange;
        this.timeRangeNumber = timeRangeNumber;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, price: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../constants/enums/currency.enum").CurrencyEnum }, userNumber: { required: true, type: () => Number }, timeRange: { required: true, enum: require("../../../../constants/enums/time-range.enum").TimeRangeEnum }, timeRangeNumber: { required: true, type: () => Number }, product: { required: true, type: () => require("./product.entity").ProductEntity }, benefitValues: { required: true, type: () => [require("./benefit-value.entity").BenefitValueEntity] }, orderDetails: { required: true, type: () => [require("../../../orders/database/entities/order-detail.entity").OrderDetailEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 50
    }),
    __metadata("design:type", String)
], ProductPackageEntity.prototype, "name", void 0);
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
        name: 'user_number',
    }),
    __metadata("design:type", Number)
], ProductPackageEntity.prototype, "userNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'time_range'
    }),
    __metadata("design:type", String)
], ProductPackageEntity.prototype, "timeRange", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'time_range_number'
    }),
    __metadata("design:type", Number)
], ProductPackageEntity.prototype, "timeRangeNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.packages),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.ProductEntity)
], ProductPackageEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => benefit_value_entity_1.BenefitValueEntity, (b) => b.productPackage),
    __metadata("design:type", Array)
], ProductPackageEntity.prototype, "benefitValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetailEntity, (d) => d.productPackage),
    __metadata("design:type", Array)
], ProductPackageEntity.prototype, "orderDetails", void 0);
ProductPackageEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'product_package' }),
    __metadata("design:paramtypes", [String, Number, String, Number, String, Number, product_entity_1.ProductEntity])
], ProductPackageEntity);
exports.ProductPackageEntity = ProductPackageEntity;
//# sourceMappingURL=product-package.entity.js.map