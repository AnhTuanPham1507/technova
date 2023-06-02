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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfigService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const nestjs_config_1 = require("nestjs-config");
let EnvConfigService = class EnvConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get isDevelopment() {
        return this.appEnv === 'development';
    }
    get isProduction() {
        return this.appEnv === 'production';
    }
    get isTest() {
        return this.appEnv === 'test';
    }
    get appEnv() {
        return this.appConfig.appEnv;
    }
    get databaseConfig() {
        const entities = [
            __dirname + '/../../**/*.entity{.ts,.js}',
            __dirname + '/../../**/*.view-entity{.ts,.js}',
            __dirname + '/../../../common/entities/*.entity{.ts,.js}',
        ];
        return {
            entities,
            keepConnectionAlive: !this.isTest,
            dropSchema: this.isTest,
            type: this.configService.get('database.type'),
            host: this.configService.get('database.host'),
            port: this.configService.get('database.port'),
            username: this.configService.get('database.username'),
            password: this.configService.get('database.password'),
            database: this.configService.get('database.database'),
            logging: this.configService.get('database.logging'),
            ssl: this.isProduction
                ? {
                    ca: fs_1.default
                        .readFileSync(this.configService.get('database.caPath'))
                        .toString(),
                }
                : false,
        };
    }
    get authConfig() {
        return {
            jwtPrivateKey: this.configService.get('auth.jwtPrivateKey'),
            jwtExpirationTime: this.configService.get('auth.jwtExpirationTime'),
            jwtRefreshKey: this.configService.get('auth.jwtRefreshKey'),
        };
    }
    get appConfig() {
        return {
            port: this.configService.get('app.port'),
            appEnv: this.configService.get('app.appEnv'),
            appMode: this.configService.get('app.appMode'),
            enableDocument: this.configService.get('app.enableDocument'),
            timezone: this.configService.get('app.timezone'),
            corsOrigins: this.configService.get('app.corsOrigins'),
            flushCacheUser: this.configService.get('app.flushCacheUser'),
            flushCachePassword: this.configService.get('app.flushCachePassword'),
            frontendUrl: this.configService.get('app.frontendUrl'),
            tribeChannelName: this.configService.get('app.tribeChannelName'),
        };
    }
    get redisConfig() {
        return {
            host: this.configService.get('redis.host'),
            port: this.configService.get('redis.port'),
            ttl: this.configService.get('redis.ttl'),
            password: this.configService.get('redis.password'),
        };
    }
    get rateLimitConfig() {
        return {
            ttl: Number.parseInt(this.configService.get('rate-limit.ttl'), 10),
            max: Number.parseInt(this.configService.get('rate-limit.max'), 10),
        };
    }
    get releaseVersion() {
        return {
            releaseVersion: process.env.VERSION,
        };
    }
};
EnvConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_config_1.ConfigService])
], EnvConfigService);
exports.EnvConfigService = EnvConfigService;
//# sourceMappingURL=api-config.service.js.map