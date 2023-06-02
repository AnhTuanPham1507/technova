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
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("./api-config.service");
let CacheService = class CacheService {
    constructor(cacheManager, configService) {
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.defaultTtl = this.configService.redisConfig.ttl;
    }
    async get(key) {
        return this.cacheManager.get(key);
    }
    async set(key, data, ttl) {
        const dataTtl = ttl ? ttl : this.defaultTtl;
        await this.cacheManager.set(key, data, {
            ttl: dataTtl,
        });
    }
    async clear() {
        await this.cacheManager.reset();
    }
    async delete(key) {
        await this.cacheManager.del(key);
    }
};
CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, api_config_service_1.EnvConfigService])
], CacheService);
exports.CacheService = CacheService;
//# sourceMappingURL=cache.service.js.map