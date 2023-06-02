"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const utils_1 = require("../common/utils");
exports.default = {
    type: (0, utils_1.getConfig)('DB_TYPE', 'postgres'),
    host: (0, utils_1.getConfig)('DB_HOST', 'localhost'),
    port: (0, utils_1.getNumberConfig)('DB_PORT', 5432),
    database: (0, utils_1.getConfig)('DB_NAME'),
    username: (0, utils_1.getConfig)('DB_APP_USER'),
    password: (0, utils_1.getConfig)('DB_APP_PASS'),
    charset: 'utf8',
    entities: [(0, path_1.join)(__dirname, '../**/**.entity{.ts,.js}')],
    synchronize: false,
    logging: (0, utils_1.getConfig)('DB_LOGGING', 'error'),
    caPath: (0, utils_1.getConfig)('DB_CA_PATH', ''),
};
//# sourceMappingURL=database.js.map