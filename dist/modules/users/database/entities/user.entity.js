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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const account_entity_1 = require("../../../auth/database/entities/account.entity");
const order_entity_1 = require("../../../orders/database/entities/order.entity");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, account: { required: true, type: () => require("../../../auth/database/entities/account.entity").AccountEntity }, orders: { required: true, type: () => [require("../../../orders/database/entities/order.entity").OrderEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 50
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        length: 50
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Incorrect format email' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone',
        length: 15
    }),
    (0, class_validator_1.IsPhoneNumber)('VI'),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => account_entity_1.AccountEntity, (account) => account.user),
    (0, typeorm_1.JoinColumn)({ name: 'account_id' }),
    __metadata("design:type", account_entity_1.AccountEntity)
], UserEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "orders", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map