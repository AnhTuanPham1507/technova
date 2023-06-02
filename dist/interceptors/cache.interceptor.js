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
exports.CacheInterceptor = void 0;
const cache_1 = require("../constants/cache");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
const REFLECTOR = 'Reflector';
const CACHE_DEBUG_HEADER = 'x-cache-debug';
let CacheInterceptor = class CacheInterceptor {
    constructor(cacheManager, reflector) {
        this.cacheManager = cacheManager;
        this.reflector = reflector;
        this.allowedMethods = ['GET'];
    }
    async intercept(context, next) {
        var _a;
        const key = this.trackBy(context);
        if (!key) {
            return next.handle();
        }
        const ttlValueOrFactory = (_a = this.reflector.get(common_1.CACHE_TTL_METADATA, context.getHandler())) !== null && _a !== void 0 ? _a : null;
        const response = context.switchToHttp().getResponse();
        try {
            const value = await this.cacheManager.get(key);
            if (!(0, lodash_1.isNil)(value)) {
                return (0, rxjs_1.of)(value).pipe((0, operators_1.tap)(() => {
                    response.setHeader(CACHE_DEBUG_HEADER, cache_1.CacheDebugStatus.HIT);
                }));
            }
            const ttl = (0, lodash_1.isFunction)(ttlValueOrFactory)
                ? await ttlValueOrFactory(context)
                : ttlValueOrFactory;
            return next.handle().pipe((0, operators_1.tap)((payload) => {
                const args = (0, lodash_1.isNil)(ttl) ? [key, payload] : [key, payload, { ttl }];
                this.cacheManager.set(...args);
            }), (0, operators_1.tap)(() => {
                response.setHeader(CACHE_DEBUG_HEADER, cache_1.CacheDebugStatus.NONE);
            }));
        }
        catch (_b) {
            return next.handle();
        }
    }
    trackBy(context) {
        var _a;
        const httpAdapter = (_a = this.httpAdapterHost) === null || _a === void 0 ? void 0 : _a.httpAdapter;
        const isHttpApp = httpAdapter && Boolean(httpAdapter.getRequestMethod);
        const cacheMetadata = this.reflector.get(common_1.CACHE_KEY_METADATA, context.getHandler());
        if (!isHttpApp || cacheMetadata) {
            return cacheMetadata;
        }
        if (!this.isRequestCacheable(context)) {
            return undefined;
        }
        const request = context.getArgByIndex(0);
        return httpAdapter.getRequestUrl(request);
    }
    isRequestCacheable(context) {
        const req = context.switchToHttp().getRequest();
        return this.allowedMethods.includes(req.method);
    }
};
__decorate([
    (0, common_1.Optional)(),
    (0, common_1.Inject)(HTTP_ADAPTER_HOST),
    __metadata("design:type", Object)
], CacheInterceptor.prototype, "httpAdapterHost", void 0);
CacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)(REFLECTOR)),
    __metadata("design:paramtypes", [Object, Object])
], CacheInterceptor);
exports.CacheInterceptor = CacheInterceptor;
//# sourceMappingURL=cache.interceptor.js.map