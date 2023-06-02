"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("./boilerplate.polyfill");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_config_1 = require("nestjs-config");
const path_1 = __importDefault(require("path"));
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const product_module_1 = require("./modules/products/product.module");
const brand_module_1 = require("./modules/brands/brand.module");
const category_module_1 = require("./modules/categories/category.module");
const shared_module_1 = require("./modules/shared/shared.module");
const api_config_service_1 = require("./modules/shared/services/api-config.service");
const bull_1 = require("@nestjs/bull");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .exclude('/v1/auth/login', '/v1/auth/refresh-token', '/v1/auth/token')
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            product_module_1.ProductModule,
            brand_module_1.BrandModule,
            category_module_1.CategoryModule,
            schedule_1.ScheduleModule.forRoot(),
            nestjs_config_1.ConfigModule.load(path_1.default.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [shared_module_1.SharedModule],
                useFactory: (configService) => configService.databaseConfig,
                async dataSourceFactory(options) {
                    if (!options) {
                        throw new Error('Invalid options passed');
                    }
                    return (0, typeorm_transactional_1.addTransactionalDataSource)(new typeorm_2.DataSource(options));
                },
                inject: [api_config_service_1.EnvConfigService],
            }),
            bull_1.BullModule.forRootAsync({
                useFactory: (configService) => ({
                    redis: {
                        host: configService.redisConfig.host,
                        port: configService.redisConfig.port,
                        password: configService.redisConfig.password,
                    },
                }),
                inject: [api_config_service_1.EnvConfigService],
            }),
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map