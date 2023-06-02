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
exports.BaseMessageResponseDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class BaseMessageResponseDTO {
    constructor(error, message) {
        this.message = message;
        this.error = error;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: false, type: () => String }, error: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'The message of the response' }),
    __metadata("design:type", String)
], BaseMessageResponseDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'errorCode',
        description: 'The error code of the response',
    }),
    __metadata("design:type", String)
], BaseMessageResponseDTO.prototype, "error", void 0);
exports.BaseMessageResponseDTO = BaseMessageResponseDTO;
//# sourceMappingURL=base-message-response.dto.js.map