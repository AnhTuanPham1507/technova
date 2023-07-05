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
exports.ProductEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const brand_entity_1 = require("../../../brands/database/entities/brand.entity");
const category_entity_1 = require("../../../categories/database/entities/category.entity");
const typeorm_1 = require("typeorm");
const discount_entity_1 = require("./discount.entity");
const product_package_entity_1 = require("./product-package.entity");
const product_tag_entity_1 = require("./product-tag.entity");
let ProductEntity = class ProductEntity extends abstract_entity_1.AbstractEntity {
    constructor(name, description, isContactToSell, brand, category) {
        super();
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.isContactToSell = isContactToSell;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, isContactToSell: { required: true, type: () => Boolean }, brand: { required: true, type: () => require("../../../brands/database/entities/brand.entity").BrandEntity, nullable: true }, category: { required: true, type: () => require("../../../categories/database/entities/category.entity").CategoryEntity, nullable: true }, discount: { required: true, type: () => require("./discount.entity").DiscountEntity }, tags: { required: true, type: () => [require("./product-tag.entity").ProductTagEntity] }, packages: { required: true, type: () => [require("./product-package.entity").ProductPackageEntity] }, benefits: { required: true, type: () => [require("./product-package.entity").ProductPackageEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 20
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'text'
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_contact_to_sell',
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "isContactToSell", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.BrandEntity, (brand) => brand.products),
    (0, typeorm_1.JoinColumn)({ name: 'brand_id' }),
    __metadata("design:type", Object)
], ProductEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Object)
], ProductEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => discount_entity_1.DiscountEntity, (discount) => discount.product),
    (0, typeorm_1.JoinColumn)({ name: 'discount_id' }),
    __metadata("design:type", discount_entity_1.DiscountEntity)
], ProductEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_tag_entity_1.ProductTagEntity, (tag) => tag.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_package_entity_1.ProductPackageEntity, (p) => p.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "packages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_package_entity_1.ProductPackageEntity, (b) => b.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "benefits", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'product' }),
    __metadata("design:paramtypes", [String, String, Boolean, brand_entity_1.BrandEntity, category_entity_1.CategoryEntity])
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map