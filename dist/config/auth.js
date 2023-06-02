"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
exports.default = {
    jwtPrivateKey: (0, utils_1.getConfig)('JWT_PRIVATE_KEY'),
    jwtExpirationTime: (0, utils_1.getConfig)('JWT_EXPIRATION_TIME'),
    jwtRefreshKey: (0, utils_1.getConfig)('JWT_REFRESH_KEY'),
};
//# sourceMappingURL=auth.js.map