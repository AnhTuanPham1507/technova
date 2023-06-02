"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var SharedModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const redisStore = __importStar(require("cache-manager-ioredis"));
const cache_controller_1 = require("./controllers/cache.controller");
const api_config_service_1 = require("./services/api-config.service");
const cache_service_1 = require("./services/cache.service");
const http_service_1 = require("./services/http.service");
const providers = [
    api_config_service_1.EnvConfigService,
    common_1.Logger,
    {
        provide: 'ICacheService',
        useClass: cache_service_1.CacheService,
    },
    http_service_1.HttpService,
];
let SharedModule = SharedModule_1 = class SharedModule {
};
SharedModule = SharedModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [cache_controller_1.CacheController],
        providers,
        imports: [
            axios_1.HttpModule,
            cqrs_1.CqrsModule,
            common_1.CacheModule.registerAsync({
                imports: [SharedModule_1],
                useFactory: (configService) => (Object.assign({ store: redisStore }, configService.redisConfig)),
                inject: [api_config_service_1.EnvConfigService],
            }),
        ],
        exports: [...providers, axios_1.HttpModule, cqrs_1.CqrsModule, common_1.CacheModule],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map