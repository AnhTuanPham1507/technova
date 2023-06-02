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
exports.AdminEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const account_entity_1 = require("../../../auth/database/entities/account.entity");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let AdminEntity = class AdminEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, account: { required: true, type: () => require("../../../auth/database/entities/account.entity").AccountEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 50
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        length: 50
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Incorrect format email' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => account_entity_1.AccountEntity, (account) => account.admin),
    (0, typeorm_1.JoinColumn)({ name: 'account_id' }),
    __metadata("design:type", account_entity_1.AccountEntity)
], AdminEntity.prototype, "account", void 0);
AdminEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'admin' })
], AdminEntity);
exports.AdminEntity = AdminEntity;
//# sourceMappingURL=admin.entity.js.map