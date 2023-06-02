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
exports.EmployeeEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const account_entity_1 = require("../../../auth/database/entities/account.entity");
const order_entity_1 = require("../../../orders/database/entities/order.entity");
const typeorm_1 = require("typeorm");
let EmployeeEntity = class EmployeeEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, account: { required: true, type: () => require("../../../auth/database/entities/account.entity").AccountEntity }, orders: { required: true, type: () => [require("../../../orders/database/entities/order.entity").OrderEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        length: 50
    }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => account_entity_1.AccountEntity, (account) => account.employee),
    (0, typeorm_1.JoinColumn)({ name: 'account_id' }),
    __metadata("design:type", account_entity_1.AccountEntity)
], EmployeeEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.employee),
    __metadata("design:type", Array)
], EmployeeEntity.prototype, "orders", void 0);
EmployeeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'employee' })
], EmployeeEntity);
exports.EmployeeEntity = EmployeeEntity;
//# sourceMappingURL=employee.entity.js.map