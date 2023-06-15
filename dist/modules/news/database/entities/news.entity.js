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
exports.NewsEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const typeorm_1 = require("typeorm");
let NewsEntity = class NewsEntity extends abstract_entity_1.AbstractEntity {
    constructor(title, content) {
        super();
        this.title = title;
        this.content = content;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, content: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        length: 50
    }),
    __metadata("design:type", String)
], NewsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'content',
        type: 'text'
    }),
    __metadata("design:type", String)
], NewsEntity.prototype, "content", void 0);
NewsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'news' }),
    __metadata("design:paramtypes", [String, String])
], NewsEntity);
exports.NewsEntity = NewsEntity;
//# sourceMappingURL=news.entity.js.map