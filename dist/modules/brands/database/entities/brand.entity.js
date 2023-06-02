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
exports.BrandEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const product_entity_1 = require("../../../products/database/entities/product.entity");
const typeorm_1 = require("typeorm");
let BrandEntity = class BrandEntity extends abstract_entity_1.AbstractEntity {
    constructor(name, products) {
        super();
        this.name = name;
        this.products = products;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, products: { required: true, type: () => [require("../../../products/database/entities/product.entity").ProductEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 20
    }),
    __metadata("design:type", String)
], BrandEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (product) => product.brand),
    __metadata("design:type", Array)
], BrandEntity.prototype, "products", void 0);
BrandEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'brand' }),
    __metadata("design:paramtypes", [String, Array])
], BrandEntity);
exports.BrandEntity = BrandEntity;
//# sourceMappingURL=brand.entity.js.map