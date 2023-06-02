"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const error_base_1 = require("./common/error.base");
const all_exception_filter_1 = require("./filters/all-exception.filter");
const validation_filter_1 = require("./filters/validation.filter");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = require("express");
const express_ctx_1 = require("express-ctx");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const typeorm_transactional_1 = require("typeorm-transactional");
const log_provider_1 = require("./providers/log.provider");
const app_module_1 = require("./app.module");
const query_failed_filter_1 = require("./filters/query-failed.filter");
const api_config_service_1 = require("./modules/shared/services/api-config.service");
const shared_module_1 = require("./modules/shared/shared.module");
const setup_swagger_1 = require("./setup-swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
    const configService = app.select(shared_module_1.SharedModule).get(api_config_service_1.EnvConfigService);
    app.useLogger(log_provider_1.LogProvider.getLoggerService());
    app.use((0, helmet_1.default)());
    const whitelist = configService.appConfig.corsOrigins;
    app.enableCors({
        origin: whitelist,
        credentials: true,
        methods: '*',
        allowedHeaders: '*, Authorization',
    });
    app.enable('trust proxy');
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: configService.rateLimitConfig.ttl,
        max: configService.rateLimitConfig.max,
    }));
    app.use((0, compression_1.default)());
    const morganFormat = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
    app.use((0, morgan_1.default)(morganFormat, {
        stream: {
            write(str) {
                common_1.Logger.log(str.slice(0, -1), 'Application');
            },
        },
    }));
    app.enableVersioning();
    const reflector = app.get(core_1.Reflector);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionFilter(), new validation_filter_1.ValidationExceptionFilter(reflector), new query_failed_filter_1.QueryFailedFilter(reflector));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: common_1.HttpStatus.BAD_REQUEST,
        transform: true,
        dismissDefaultMessages: configService.isProduction,
        exceptionFactory: (errors) => {
            common_1.Logger.error(errors, '', 'ValidationPipe');
            return new error_base_1.ValidationException(errors);
        },
        forbidUnknownValues: true,
    }));
    if (configService.appConfig.enableDocument) {
        (0, setup_swagger_1.setupSwagger)(app);
    }
    app.use(express_ctx_1.middleware);
    (0, typeorm_transactional_1.initializeTransactionalContext)();
    if (!configService.isDevelopment) {
        app.enableShutdownHooks();
    }
    const port = configService.appConfig.port;
    await app.listen(port);
    common_1.Logger.log(`Server is listening on port ${port}`, 'Boostrap');
    return app;
}
exports.bootstrap = bootstrap;
void bootstrap();
//# sourceMappingURL=main.js.map