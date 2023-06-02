"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
exports.default = {
    host: (0, utils_1.getConfig)('APP_HOST', '127.0.0.1'),
    port: (0, utils_1.getNumberConfig)('APP_PORT', 3000),
    appEnv: (0, utils_1.getConfig)('APP_ENV', 'development'),
    appMode: (0, utils_1.getConfig)('APP_MODE', 'web'),
    enableDocument: (0, utils_1.getConfig)('APP_ENABLE_DOCUMENTATION', true),
    timezone: (0, utils_1.getConfig)('APP_TZ', 'UTC'),
    corsOrigins: (0, utils_1.getConfig)('APP_CORS_ORIGINS'),
    flushCacheUser: (0, utils_1.getConfig)('APP_FLUSH_CACHE_USER'),
    flushCachePassword: (0, utils_1.getConfig)('APP_FLUSH_CACHE_PASSWORD'),
};
//# sourceMappingURL=app.js.map