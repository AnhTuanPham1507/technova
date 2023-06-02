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
exports.CommentEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../common/abstract.entity");
const account_entity_1 = require("../../../auth/database/entities/account.entity");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let CommentEntity = class CommentEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: true, type: () => String }, product: { required: true, type: () => require("./product.entity").ProductEntity }, author: { required: true, type: () => require("../../../auth/database/entities/account.entity").AccountEntity } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'content',
        type: 'text'
    }),
    __metadata("design:type", String)
], CommentEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.comments),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.ProductEntity)
], CommentEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.AccountEntity, (product) => product.comments),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", account_entity_1.AccountEntity)
], CommentEntity.prototype, "author", void 0);
CommentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'comment' })
], CommentEntity);
exports.CommentEntity = CommentEntity;
//# sourceMappingURL=comment.entity.js.map