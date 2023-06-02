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
const react_entity_1 = require("../../../news/database/entities/react.entity");
const comment_entity_1 = require("../../../products/database/entities/comment.entity");
const review_entity_1 = require("../../../products/database/entities/review.entity");
const admin_entity_1 = require("../../../users/database/entities/admin.entity");
const employee_entity_1 = require("../../../users/database/entities/employee.entity");
const user_entity_1 = require("../../../users/database/entities/user.entity");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
let AccountEntity = class AccountEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, type: () => require("./role.entity").RoleEntity }, reacts: { required: true, type: () => [require("../../../news/database/entities/react.entity").ReactEntity] }, comments: { required: true, type: () => [require("../../../products/database/entities/comment.entity").CommentEntity] }, reviews: { required: true, type: () => [require("../../../products/database/entities/review.entity").ReviewEntity] }, user: { required: true, type: () => require("../../../users/database/entities/user.entity").UserEntity }, admin: { required: true, type: () => require("../../../users/database/entities/admin.entity").AdminEntity }, employee: { required: true, type: () => require("../../../users/database/entities/admin.entity").AdminEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'username',
        length: 50,
        unique: true
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'password',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RoleEntity, (role) => role.accounts),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.RoleEntity)
], AccountEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => react_entity_1.ReactEntity, (react) => react.author),
    __metadata("design:type", Array)
], AccountEntity.prototype, "reacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (comment) => comment.author),
    __metadata("design:type", Array)
], AccountEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.author),
    __metadata("design:type", Array)
], AccountEntity.prototype, "reviews", void 0);
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
    (0, typeorm_1.Entity)({ name: 'account' })
], AccountEntity);
exports.AccountEntity = AccountEntity;
//# sourceMappingURL=account.entity.js.map