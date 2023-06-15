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
exports.AccountEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const role_enum_1 = require("../../../../constants/enums/role.enum");
const admin_entity_1 = require("../../../clients/database/entities/admin.entity");
const employee_entity_1 = require("../../../clients/database/entities/employee.entity");
const user_entity_1 = require("../../../clients/database/entities/user.entity");
const typeorm_1 = require("typeorm");
let AccountEntity = class AccountEntity extends abstract_entity_1.AbstractEntity {
    constructor(email, password, role) {
        super();
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, enum: require("../../../../constants/enums/role.enum").RoleEnum }, user: { required: true, type: () => require("../../../clients/database/entities/user.entity").UserEntity }, admin: { required: true, type: () => require("../../../clients/database/entities/admin.entity").AdminEntity }, employee: { required: true, type: () => require("../../../clients/database/entities/admin.entity").AdminEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        length: 50,
        unique: true
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'password',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role',
        type: 'enum',
        enum: role_enum_1.RoleEnum
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.account),
    __metadata("design:type", user_entity_1.UserEntity)
], AccountEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => admin_entity_1.AdminEntity, (admin) => admin.account),
    __metadata("design:type", admin_entity_1.AdminEntity)
], AccountEntity.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => employee_entity_1.EmployeeEntity, (employee) => employee.account),
    __metadata("design:type", admin_entity_1.AdminEntity)
], AccountEntity.prototype, "employee", void 0);
AccountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'account' }),
    __metadata("design:paramtypes", [String, String, String])
], AccountEntity);
exports.AccountEntity = AccountEntity;
//# sourceMappingURL=account.entity.js.map