"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogProvider = void 0;
const utils_1 = require("../common/utils");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
class LogProvider {
    static getLoggerService() {
        const logFormat = winston_1.format.combine(winston_1.format.colorize({ all: process.env.APP_ENV === 'development' }), winston_1.format.timestamp(), winston_1.format.printf((msg) => `${msg.timestamp} [${(0, utils_1.getValueOfSymbolKey)(msg, Symbol.for('level'))}] - [${msg.context}] ${msg.message}`));
        return nest_winston_1.WinstonModule.createLogger({
            exitOnError: false,
            format: logFormat,
            levels: {
                error: 0,
                warn: 1,
                info: 2,
                verbose: 3,
                debug: 4,
            },
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize()),
                    level: process.env.APP_ENV === 'production' ? 'info' : 'debug',
                }),
            ],
        });
    }
}
exports.LogProvider = LogProvider;
//# sourceMappingURL=log.provider.js.map