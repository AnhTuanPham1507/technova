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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageMetaDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class PageMetaDTO {
    constructor({ pageOptionsDTO, itemCount }) {
        this.page = pageOptionsDTO.page;
        this.take = pageOptionsDTO.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number }, take: { required: true, type: () => Number }, itemCount: { required: true, type: () => Number }, pageCount: { required: true, type: () => Number }, hasPreviousPage: { required: true, type: () => Boolean }, hasNextPage: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDTO.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDTO.prototype, "itemCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDTO.prototype, "pageCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PageMetaDTO.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PageMetaDTO.prototype, "hasNextPage", void 0);
exports.PageMetaDTO = PageMetaDTO;
//# sourceMappingURL=page-meta.dto.js.map