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
var QueryFailedFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFailedFilter = void 0;
const base_message_response_dto_1 = require("../common/dtos/responses/base-message-response.dto");
const error_code_1 = require("../common/error-code");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
let QueryFailedFilter = QueryFailedFilter_1 = class QueryFailedFilter {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger(QueryFailedFilter_1.name);
    }
    catch(exception, host) {
        var _a;
        this.logger.error(`${exception.name}: ${exception.message}`, '', QueryFailedFilter_1.name, '');
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = ((_a = exception.constraint) === null || _a === void 0 ? void 0 : _a.startsWith('UQ'))
            ? common_1.HttpStatus.CONFLICT
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        response
            .status(status)
            .json(new base_message_response_dto_1.BaseMessageResponseDTO(error_code_1.ErrorCodeEnum.QUERY_FAILED, 'Query fail'));
    }
};
QueryFailedFilter = QueryFailedFilter_1 = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError),
    __metadata("design:paramtypes", [core_1.Reflector])
], QueryFailedFilter);
exports.QueryFailedFilter = QueryFailedFilter;
//# sourceMappingURL=query-failed.filter.js.map