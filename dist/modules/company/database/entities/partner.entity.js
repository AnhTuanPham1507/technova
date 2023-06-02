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
exports.PartnerEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const typeorm_1 = require("typeorm");
let PartnerEntity = class PartnerEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 20
    }),
    __metadata("design:type", String)
], PartnerEntity.prototype, "name", void 0);
PartnerEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partner' })
], PartnerEntity);
exports.PartnerEntity = PartnerEntity;
//# sourceMappingURL=partner.entity.js.map