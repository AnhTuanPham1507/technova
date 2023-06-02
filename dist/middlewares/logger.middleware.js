"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const utils_1 = require("../common/utils");
const common_1 = require("@nestjs/common");
let LoggerMiddleware = LoggerMiddleware_1 = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger(LoggerMiddleware_1.name);
    }
    use(req, res, next) {
        var _a;
        const { ip, method, originalUrl, headers, body } = req;
        let reqLog = {
            method,
            originalUrl,
            ip,
            contentType: headers['content-type'],
        };
        if ((_a = headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('application/json')) {
            reqLog = Object.assign(Object.assign({}, reqLog), { body });
        }
        this.logger.log(`Request: ${JSON.stringify(reqLog)}`);
        next();
    }
    logResponse(res) {
        const rawResponse = res.write;
        const rawResponseEnd = res.end;
        const chunkBuffers = [];
        res.write = (...chunks) => {
            const resArgs = [];
            for (let i = 0; i < chunks.length; i++) {
                resArgs[i] = chunks[i];
                if (!resArgs[i]) {
                    res.once('drain', res.write);
                    i--;
                }
            }
            if (resArgs[0]) {
                chunkBuffers.push(Buffer.from(resArgs[0]));
            }
            return rawResponse.apply(res, resArgs);
        };
        res.end = (...chunk) => {
            var _a;
            const resArgs = [];
            for (const [i, element] of chunk.entries()) {
                resArgs[i] = element;
            }
            if (resArgs[0]) {
                chunkBuffers.push(Buffer.from(resArgs[0]));
            }
            const body = Buffer.concat(chunkBuffers).toString('utf8');
            const headersResponse = res.getHeaders();
            const bodyLog = ((_a = headersResponse['content-type']) === null || _a === void 0 ? void 0 : _a.toString().includes('application/json'))
                ? JSON.parse(body)
                : 'Content is not JSON';
            const responseLog = {
                response: {
                    statusCode: res.statusCode,
                    headers: {
                        'content-type': headersResponse['content-type'],
                        'content-length': headersResponse['content-length'],
                    },
                    body: bodyLog || {},
                },
            };
            this.logger.log(`Response: ${(0, utils_1.deepLog)(responseLog)}`);
            rawResponseEnd.apply(res, resArgs);
            const response = {
                response: {
                    statusCode: res.statusCode,
                    body: body || {},
                    headers: res.getHeaders(),
                },
            };
            return response;
        };
    }
};
LoggerMiddleware = LoggerMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map