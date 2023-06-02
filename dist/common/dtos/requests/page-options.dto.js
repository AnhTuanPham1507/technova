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
exports.PageOptionsDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const query_type_enum_1 = require("../../../constants/enums/query-type.enum");
const order_enum_1 = require("../../../constants/enums/order.enum");
const order_by_enum_1 = require("../../../constants/enums/order-by.enum");
class PageOptionsDTO {
    constructor() {
        this.queryType = query_type_enum_1.QueryTypeEnum.ALL;
        this.order = order_enum_1.OrderEnum.DESC;
        this.orderBy = order_by_enum_1.OrderByEnum.CREATED_AT;
        this.page = 1;
        this.take = 10;
    }
    get skip() {
        return (this.page - 1) * this.take;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { queryType: { required: true, default: query_type_enum_1.QueryTypeEnum.ALL, enum: require("../../../constants/enums/query-type.enum").QueryTypeEnum }, order: { required: true, default: order_enum_1.OrderEnum.DESC, enum: require("../../../constants/enums/order.enum").OrderEnum }, orderBy: { required: true, default: order_by_enum_1.OrderByEnum.CREATED_AT, enum: require("../../../constants/enums/order-by.enum").OrderByEnum }, q: { required: false, type: () => String }, page: { required: true, type: () => Number, default: 1, minimum: 1 }, take: { required: true, type: () => Number, default: 10, minimum: 1, maximum: 50 } };
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(query_type_enum_1.QueryTypeEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ default: query_type_enum_1.QueryTypeEnum.ALL, enum: query_type_enum_1.QueryTypeEnum }),
    __metadata("design:type", String)
], PageOptionsDTO.prototype, "queryType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_enum_1.OrderEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ default: order_enum_1.OrderEnum.DESC, enum: order_enum_1.OrderEnum }),
    __metadata("design:type", String)
], PageOptionsDTO.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: order_by_enum_1.OrderByEnum,
        default: order_by_enum_1.OrderByEnum.CREATED_AT,
    }),
    (0, class_validator_1.IsEnum)(order_by_enum_1.OrderByEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDTO.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDTO.prototype, "q", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        default: 1,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 50,
        default: 10,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDTO.prototype, "take", void 0);
exports.PageOptionsDTO = PageOptionsDTO;
//# sourceMappingURL=page-options.dto.js.map