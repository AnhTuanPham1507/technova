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
exports.ProductBenefitEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const typeorm_1 = require("typeorm");
const benefit_value_entity_1 = require("./benefit-value.entity");
const product_entity_1 = require("./product.entity");
let ProductBenefitEntity = class ProductBenefitEntity extends abstract_entity_1.AbstractEntity {
    constructor(name, product) {
        super();
        this.name = name;
        this.product = product;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, benefitValues: { required: true, type: () => [require("./benefit-value.entity").BenefitValueEntity] }, product: { required: true, type: () => require("./product.entity").ProductEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 100
    }),
    __metadata("design:type", String)
], ProductBenefitEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => benefit_value_entity_1.BenefitValueEntity, (b) => b.benefit),
    __metadata("design:type", Array)
], ProductBenefitEntity.prototype, "benefitValues", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.benefits),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.ProductEntity)
], ProductBenefitEntity.prototype, "product", void 0);
ProductBenefitEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'product_benefit' }),
    __metadata("design:paramtypes", [String, product_entity_1.ProductEntity])
], ProductBenefitEntity);
exports.ProductBenefitEntity = ProductBenefitEntity;
//# sourceMappingURL=product-benefit.entity.js.map