"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const base_message_response_dto_1 = require("../common/dtos/responses/base-message-response.dto");
const error_base_1 = require("../common/error.base");
const error_code_1 = require("../common/error-code");
const common_1 = require("@nestjs/common");
let AllExceptionFilter = AllExceptionFilter_1 = class AllExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        this.logger.error(`${exception.name}: ${exception.message}`, '', AllExceptionFilter_1.name, '');
        if (exception instanceof common_1.HttpException) {
            const statusCode = exception.getStatus();
            const errorObj = exception.getResponse();
            const error = new base_message_response_dto_1.BaseMessageResponseDTO(errorObj.error, errorObj.message);
            response.status(statusCode).json(error);
            return;
        }
        if (exception instanceof error_base_1.BaseError) {
            const error = new base_message_response_dto_1.BaseMessageResponseDTO(exception.errorCode, exception.message);
            response.status(common_1.HttpStatus.BAD_REQUEST).json(error);
            return;
        }
        response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(new base_message_response_dto_1.BaseMessageResponseDTO(error_code_1.ErrorCodeEnum.INTERNAL_SERVER_ERROR, exception.message));
    }
};
AllExceptionFilter = AllExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all-exception.filter.js.map