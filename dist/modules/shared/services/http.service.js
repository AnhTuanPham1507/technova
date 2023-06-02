"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var HttpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const utils_1 = require("../../../common/utils");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const axios_2 = require("axios");
const class_transformer_1 = require("class-transformer");
const form_data_1 = __importDefault(require("form-data"));
const https_1 = require("https");
const moment_1 = __importDefault(require("moment"));
const rxjs_1 = require("rxjs");
const stream_1 = require("stream");
let HttpService = HttpService_1 = class HttpService {
    constructor(axios) {
        this.axios = axios;
        this.httpsAgent = new https_1.Agent();
        this.logger = new common_1.Logger(HttpService_1.name);
    }
    getAuthConfigAndHeaders(service) {
        switch (service.getAuthType()) {
            case 'basic':
                return {
                    headers: Object.assign({}, service.getHeaders()),
                };
            case 'bearer':
                return {
                    headers: Object.assign({ Authorization: `Bearer ${service.getAuthData()}` }, service.getHeaders()),
                };
        }
    }
    getRequestConfig(service) {
        let queryParams;
        if (service.getQueryParameter()) {
            const queryRecord = (0, class_transformer_1.instanceToPlain)(service.getQueryParameter());
            this.logger.log(`Query params: ${JSON.stringify(queryRecord)}`);
            for (const k of Object.keys(queryRecord)) {
                if (queryRecord[k] === undefined) {
                    delete queryRecord[k];
                }
            }
            queryParams = new URLSearchParams(queryRecord);
        }
        const responseType = service.getResponseType();
        return Object.assign(Object.assign({ httpsAgent: this.httpsAgent }, this.getAuthConfigAndHeaders(service)), { transformResponse: (0, utils_1.getTransformResponseCallback)(responseType), transformRequest: (data) => {
                if (data instanceof form_data_1.default) {
                    return data;
                }
                if (typeof data === 'object') {
                    const body = JSON.stringify((0, class_transformer_1.instanceToPlain)(data));
                    this.logger.log(`Body: ${body}`);
                    return body;
                }
                this.logger.log(`Body: ${data}`);
                return data;
            }, responseType: service.getResponseType().name === stream_1.Stream.name ? 'stream' : 'json', params: queryParams, timeout: service.getTimeout ? service.getTimeout() : undefined });
    }
    async call(service) {
        var _a, _b, _c, _d, _e;
        this.logger.log(`Request - ${service.getMethod()} ${service.getEndpoint()}`);
        const startTime = (0, moment_1.default)();
        let responseObs;
        const apiUrl = service.getDomain() + service.getEndpoint();
        switch (service.getMethod()) {
            case 'POST':
                responseObs = this.axios.post(apiUrl, service.getBody(), this.getRequestConfig(service));
                break;
            case 'DELETE':
                responseObs = this.axios.delete(apiUrl, Object.assign(Object.assign({}, this.getRequestConfig(service)), { data: service.getBody() }));
                break;
            case 'PUT':
                responseObs = this.axios.put(apiUrl, service.getBody(), this.getRequestConfig(service));
                break;
            case 'GET':
                responseObs = this.axios.get(apiUrl, this.getRequestConfig(service));
                break;
            default:
                throw new Error('Method is not valid');
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(responseObs);
            const endTime = (0, moment_1.default)();
            const responseTime = endTime.diff(startTime, 'milliseconds');
            this.logger.log(`${response.status} - ${service.getMethod()} ${service.getEndpoint()} - ${response.headers.traceparent} - ${responseTime}ms`);
            if (service.getResponseType().name !== stream_1.Stream.name) {
                this.logger.log(`Response body: ${(0, utils_1.deepLog)(response.data)}`);
            }
            return response.data;
        }
        catch (error) {
            const endTime = (0, moment_1.default)();
            const responseTime = endTime.diff(startTime, 'milliseconds');
            this.logger.error(`ResponseTime: ${responseTime}ms | ${error}`, HttpService_1.name);
            if (error instanceof axios_2.AxiosError) {
                if (service.handleError) {
                    service.handleError(error);
                }
                this.logger.error(`${(_a = error.response) === null || _a === void 0 ? void 0 : _a.status} - ${service.getMethod()} ${service.getEndpoint()} - ${(_b = error.response) === null || _b === void 0 ? void 0 : _b.headers.traceparent}  - ${responseTime}ms`, HttpService_1.name);
                this.logger.error(`Response body: ${(0, utils_1.deepLog)((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)}`, HttpService_1.name);
                this.logger.error(`Response header: ${(0, utils_1.deepLog)((_d = error.response) === null || _d === void 0 ? void 0 : _d.headers)}`, HttpService_1.name);
                switch ((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) {
                    case common_1.HttpStatus.BAD_REQUEST:
                        throw new common_1.BadRequestException(error);
                    case common_1.HttpStatus.NOT_FOUND:
                        throw new common_1.NotFoundException(error);
                    case common_1.HttpStatus.UNAUTHORIZED:
                        throw new common_1.UnauthorizedException(error);
                    case common_1.HttpStatus.FORBIDDEN:
                        throw new common_1.ForbiddenException(error);
                }
            }
            throw new common_1.ServiceUnavailableException(error);
        }
    }
};
HttpService = HttpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map