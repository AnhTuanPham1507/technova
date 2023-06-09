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
exports.ProductBenefitDTO = void 0;
const openapi = require("@nestjs/swagger");
const abstract_dto_1 = require("../../../../common/dtos/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
const benefit_value_dto_1 = require("./benefit-value.dto");
const product_dto_1 = require("./product.dto");
class ProductBenefitDTO extends abstract_dto_1.AbstractDTO {
    constructor(productBenefit, benefitValuesDTO, productDTO) {
        super(productBenefit);
        this.name = productBenefit.name;
        this.product = productDTO;
        this.benefitValues = benefitValuesDTO;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, product: { required: false, type: () => require("./product.dto").ProductDTO }, benefitValues: { required: false, type: () => [require("./benefit-value.dto").BenefitValueDTO] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'Expired time'
    }),
    __metadata("design:type", String)
], ProductBenefitDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'product',
        type: product_dto_1.ProductDTO,
    }),
    __metadata("design:type", product_dto_1.ProductDTO)
], ProductBenefitDTO.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'benefitValues',
        type: benefit_value_dto_1.BenefitValueDTO,
        isArray: true
    }),
    __metadata("design:type", Array)
], ProductBenefitDTO.prototype, "benefitValues", void 0);
exports.ProductBenefitDTO = ProductBenefitDTO;
//# sourceMappingURL=product-benefit.dto.js.map