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
const news_type_enum_1 = require("../../../../constants/enums/news-type.enum");
const typeorm_1 = require("typeorm");
const react_entity_1 = require("./react.entity");
const tag_entity_1 = require("./tag.entity");
let NewsEntity = class NewsEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, content: { required: true, type: () => String }, type: { required: true, enum: require("../../../../constants/enums/news-type.enum").newsTypeEnum }, tags: { required: true, type: () => [require("./tag.entity").NewsTagEntity] }, reacts: { required: true, type: () => [require("./react.entity").ReactEntity] } };
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
__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'enum',
        enum: news_type_enum_1.newsTypeEnum
    }),
    __metadata("design:type", String)
], NewsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tag_entity_1.NewsTagEntity, (newsTag) => newsTag.news),
    __metadata("design:type", Array)
], NewsEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => react_entity_1.ReactEntity, (react) => react.news),
    __metadata("design:type", Array)
], NewsEntity.prototype, "reacts", void 0);
NewsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'news' })
], NewsEntity);
exports.NewsEntity = NewsEntity;
//# sourceMappingURL=news.entity.js.map