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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const my_moment_util_1 = require("../../../utils/my-moment.util");
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../database/entities/category.entity");
const category_dto_1 = require("../dtos/responses/category.dto");
let CategoryService = class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    getEntityById(id) {
        return this.categoryRepo.getById(id);
    }
    async getById(id) {
        const foundCategory = await this.categoryRepo.getById(id);
        const categoryDTO = new category_dto_1.CategoryDTO(foundCategory);
        return categoryDTO;
    }
    async getAll(queryType) {
        const categories = await this.categoryRepo.getAll(queryType);
        const categoriesDTO = categories.map(category => new category_dto_1.CategoryDTO(category));
        return categoriesDTO;
    }
    async create(createCategory, userId) {
        const { name } = createCategory;
        const category = new category_entity_1.CategoryEntity(name, new Array());
        category.createdBy = userId;
        category.updatedBy = userId;
        const createdCategory = await this.categoryRepo.save(category);
        const categoryDTO = new category_dto_1.CategoryDTO(createdCategory);
        return categoryDTO;
    }
    async update(id, updateCategory, userId) {
        const foundCategory = await this.categoryRepo.getById(id);
        const category = Object.assign(foundCategory, Object.assign(Object.assign({}, updateCategory), { updatedAt: my_moment_util_1.Moment.getCurrentDate(), updatedBy: userId }));
        const updatedCategory = await this.categoryRepo.save(category);
        const categoryDTO = new category_dto_1.CategoryDTO(updatedCategory);
        return categoryDTO;
    }
    async delete(id, userId) {
        const foundCategory = await this.categoryRepo.getById(id);
        const category = Object.assign(foundCategory, {
            deletedAt: my_moment_util_1.Moment.getCurrentDate(),
            deletedBy: userId
        });
        const deletedCategory = await this.categoryRepo.save(category);
        const categoryDTO = new category_dto_1.CategoryDTO(deletedCategory);
        return categoryDTO;
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICategoryRepository')),
    __metadata("design:paramtypes", [Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map