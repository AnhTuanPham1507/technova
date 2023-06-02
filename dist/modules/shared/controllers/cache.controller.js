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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let CacheController = class CacheController {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async flushCaches() {
        await this.cacheService.clear();
    }
    async flushKey(key) {
        await this.cacheService.delete(key);
    }
};
__decorate([
    (0, common_1.Delete)('flush'),
    (0, swagger_1.ApiOkResponse)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "flushCaches", null);
__decorate([
    (0, common_1.Delete)(':key/flush'),
    (0, swagger_1.ApiOkResponse)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "flushKey", null);
CacheController = __decorate([
    (0, common_1.Controller)('cache'),
    (0, swagger_1.ApiTags)('Cache'),
    __param(0, (0, common_1.Inject)('ICacheService')),
    __metadata("design:paramtypes", [Object])
], CacheController);
exports.CacheController = CacheController;
//# sourceMappingURL=cache.controller.js.map