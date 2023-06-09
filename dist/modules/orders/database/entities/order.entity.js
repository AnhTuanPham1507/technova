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
exports.OrderEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const order_status_enum_1 = require("../../../../constants/enums/order-status.enum");
const employee_entity_1 = require("../../../clients/database/entities/employee.entity");
const user_entity_1 = require("../../../clients/database/entities/user.entity");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const order_detail_entity_1 = require("./order-detail.entity");
const payment_entity_1 = require("./payment.entity");
let OrderEntity = class OrderEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { totalPrice: { required: true, type: () => Number }, status: { required: true, enum: require("../../../../constants/enums/order-status.enum").OrderStatusEnum }, isPaid: { required: true, type: () => Boolean }, customerName: { required: true, type: () => String }, phone: { required: true, type: () => String }, email: { required: true, type: () => String }, user: { required: true, type: () => require("../../../clients/database/entities/user.entity").UserEntity }, employee: { required: true, type: () => require("../../../clients/database/entities/employee.entity").EmployeeEntity }, payment: { required: true, type: () => require("./payment.entity").PaymentEntity }, details: { required: true, type: () => [require("./order-detail.entity").OrderDetailEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_price',
        type: 'float'
    }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: order_status_enum_1.OrderStatusEnum,
        default: order_status_enum_1.OrderStatusEnum.pending
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        name: 'is_paid',
        default: false
    }),
    __metadata("design:type", Boolean)
], OrderEntity.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'customer_name',
        length: 50
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone',
        length: 15
    }),
    (0, class_transformer_1.Transform)((v) => "+84" + v.value),
    (0, class_validator_1.IsPhoneNumber)('VI'),
    __metadata("design:type", String)
], OrderEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        length: 50
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.orders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity, (e) => e.orders),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], OrderEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_entity_1.PaymentEntity, (payment) => payment.order),
    __metadata("design:type", payment_entity_1.PaymentEntity)
], OrderEntity.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetailEntity, (d) => d.order),
    __metadata("design:type", Array)
], OrderEntity.prototype, "details", void 0);
OrderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'order' })
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map