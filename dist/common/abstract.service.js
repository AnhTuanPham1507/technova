"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const DEFAULT_TIME_OUT = 300000;
class BaseService {
    constructor(domain, endPoint, method, body, queryParameter) {
        this.domain = domain;
        this.endPoint = endPoint;
        this.body = body;
        this.method = method;
        this.queryParameter = queryParameter;
    }
    getResponseType() {
        throw new Error('Method not implemented.');
    }
    getMethod() {
        return this.method;
    }
    getQueryParameter() {
        return this.queryParameter;
    }
    getEndpoint() {
        return this.endPoint;
    }
    getBody() {
        return this.body;
    }
    getDomain() {
        return this.domain;
    }
    getTimeout() {
        return DEFAULT_TIME_OUT;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=abstract.service.js.map