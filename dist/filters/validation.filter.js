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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ValidationExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const base_message_response_dto_1 = require("../common/dtos/responses/base-message-response.dto");
const error_base_1 = require("../common/error.base");
const error_code_1 = require("../common/error-code");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const lodash_1 = __importDefault(require("lodash"));
let ValidationExceptionFilter = ValidationExceptionFilter_1 = class ValidationExceptionFilter {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger(ValidationExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();
        const r = exception.getResponse();
        const validationErrors = r.message;
        const resDto = this.validationFilter(validationErrors);
        this.logger.error(`${exception.name}: ${validationErrors}`, '', ValidationExceptionFilter_1.name, '');
        response.status(statusCode).json(resDto);
    }
    validationFilter(validationErrors) {
        var _a;
        for (const validationError of validationErrors) {
            const children = validationError.children;
            if (children && !lodash_1.default.isEmpty(children)) {
                return this.validationFilter(children);
            }
            delete validationError.children;
            const constraints = (_a = validationError.constraints) !== null && _a !== void 0 ? _a : {};
            const message = Object.entries(constraints)
                .map(([, value]) => value)
                .join('\n');
            return new base_message_response_dto_1.BaseMessageResponseDTO(error_code_1.ErrorCodeEnum.BAD_REQUEST, message);
        }
        return new base_message_response_dto_1.BaseMessageResponseDTO(error_code_1.ErrorCodeEnum.BAD_REQUEST, 'validate fail');
    }
};
ValidationExceptionFilter = ValidationExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(error_base_1.ValidationException),
    __metadata("design:paramtypes", [core_1.Reflector])
], ValidationExceptionFilter);
exports.ValidationExceptionFilter = ValidationExceptionFilter;
//# sourceMappingURL=validation.filter.js.map