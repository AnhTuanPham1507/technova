"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
exports.default = {
    host: (0, utils_1.getConfig)('REDIS_HOST'),
    port: (0, utils_1.getNumberConfig)('REDIS_PORT'),
    password: (0, utils_1.getConfig)('REDIS_PASSWORD'),
    ttl: (0, utils_1.getNumberConfig)('REDIS_TTL', 300),
};
//# sourceMappingURL=redis.js.map