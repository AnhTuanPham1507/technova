"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
exports.default = {
    ttl: (0, utils_1.getNumberConfig)('APP_RATE_LIMIT_TTL'),
    max: (0, utils_1.getNumberConfig)('APP_RATE_LIMIT_MAX'),
};
//# sourceMappingURL=rate-limit.js.map