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
exports.PaymentEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const payment_type_enum_1 = require("../../../../constants/enums/payment-type.enum");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let PaymentEntity = class PaymentEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { momoId: { required: true, type: () => String }, type: { required: true, enum: require("../../../../constants/enums/payment-type.enum").paymentTypeEnum }, order: { required: true, type: () => require("./order.entity").OrderEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'momo_id'
    }),
    __metadata("design:type", String)
], PaymentEntity.prototype, "momoId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'enum',
        enum: payment_type_enum_1.paymentTypeEnum
    }),
    __metadata("design:type", String)
], PaymentEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.OrderEntity, (order) => order.payment),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_entity_1.OrderEntity)
], PaymentEntity.prototype, "order", void 0);
PaymentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'payment' })
], PaymentEntity);
exports.PaymentEntity = PaymentEntity;
//# sourceMappingURL=payment.entity.js.map