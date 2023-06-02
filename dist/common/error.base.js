"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreErrorResponse = exports.ValidationException = exports.BaseError = void 0;
const common_1 = require("@nestjs/common");
class BaseError extends Error {
    constructor(msg, errorCode) {
        super(msg);
        this.errorCode = errorCode;
        this.message = msg;
    }
}
exports.BaseError = BaseError;
class ValidationException extends common_1.BadRequestException {
}
exports.ValidationException = ValidationException;
class CoreErrorResponse {
}
exports.CoreErrorResponse = CoreErrorResponse;
//# sourceMappingURL=error.base.js.map