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
const time_range_enum_1 = require("../../../../constants/enums/time-range.enum");
const swagger_1 = require("@nestjs/swagger");
const benefit_value_dto_1 = require("./benefit-value.dto");
const product_dto_1 = require("./product.dto");
class ProductPackageDTO extends abstract_dto_1.AbstractDTO {
    constructor(productPackage, benefitValuesDTO, productDTO) {
        super(productPackage);
        this.name = productPackage.name;
        this.userNumber = productPackage.userNumber;
        this.timeRange = productPackage.timeRange;
        this.timeRangeNumber = productPackage.timeRangeNumber;
        this.price = productPackage.price;
        this.currency = productPackage.currency;
        this.product = productDTO;
        this.benefitValues = benefitValuesDTO;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, userNumber: { required: true, type: () => Number }, timeRangeNumber: { required: true, type: () => Number }, timeRange: { required: true, enum: require("../../../../constants/enums/time-range.enum").TimeRangeEnum }, price: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../constants/enums/currency.enum").CurrencyEnum }, product: { required: false, type: () => require("./product.dto").ProductDTO }, benefitValues: { required: false, type: () => [require("./benefit-value.dto").BenefitValueDTO] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'free'
    }),
    __metadata("design:type", String)
], ProductPackageDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'userNumber',
        example: 1
    }),
    __metadata("design:type", Number)
], ProductPackageDTO.prototype, "userNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'timeRange',
        example: 1
    }),
    __metadata("design:type", Number)
], ProductPackageDTO.prototype, "timeRangeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'price',
        type: 'enum',
        enum: time_range_enum_1.TimeRangeEnum,
        example: time_range_enum_1.TimeRangeEnum.DAY
    }),
    __metadata("design:type", String)
], ProductPackageDTO.prototype, "timeRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'price',
        example: 300000
    }),
    __metadata("design:type", Number)
], ProductPackageDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'currency',
        type: 'enum',
        enum: currency_enum_1.CurrencyEnum,
        example: currency_enum_1.CurrencyEnum.vnd
    }),
    __metadata("design:type", String)
], ProductPackageDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'product',
        type: product_dto_1.ProductDTO
    }),
    __metadata("design:type", product_dto_1.ProductDTO)
], ProductPackageDTO.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'benefitValues',
        type: benefit_value_dto_1.BenefitValueDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], ProductPackageDTO.prototype, "benefitValues", void 0);
exports.ProductPackageDTO = ProductPackageDTO;
//# sourceMappingURL=product-package.dto.js.map