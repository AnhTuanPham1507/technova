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
exports.ProductPackageDTO = void 0;
const openapi = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../common/dtos/abstract.dto");
const currency_enum_1 = require("../../../../constants/enums/currency.enum");
const swagger_1 = require("@nestjs/swagger");
class ProductPackageDTO extends abstract_dto_1.AbstractDTO {
    constructor(productPackage) {
        super(productPackage);
        this.currency = productPackage.currency;
        this.inStockQuantity = productPackage.inStockQuantity;
        this.timeRange = productPackage.timeRange;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { price: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../constants/enums/currency.enum").CurrencyEnum }, timeRange: { required: true, type: () => Date }, inStockQuantity: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'price',
        type: 'float'
    }),
    __metadata("design:type", Number)
], ProductPackageDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'currency',
        type: 'enum',
        enum: currency_enum_1.CurrencyEnum
    }),
    __metadata("design:type", String)
], ProductPackageDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'timeRange',
        type: 'timestamp with time zone'
    }),
    __metadata("design:type", Date)
], ProductPackageDTO.prototype, "timeRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'inStockQuantity'
    }),
    __metadata("design:type", Number)
], ProductPackageDTO.prototype, "inStockQuantity", void 0);
exports.ProductPackageDTO = ProductPackageDTO;
//# sourceMappingURL=product-package.dto.js.map