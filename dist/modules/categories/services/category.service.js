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
const image_object_type_enum_1 = require("../../../constants/enums/image-object-type.enum");
const query_type_enum_1 = require("../../../constants/enums/query-type.enum");
const update_image_dto_1 = require("../../images/dtos/requests/update-image.dto");
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../database/entities/category.entity");
const category_dto_1 = require("../dtos/responses/category.dto");
let CategoryService = class CategoryService {
    constructor(categoryRepo, imageService) {
        this.categoryRepo = categoryRepo;
        this.imageService = imageService;
    }
    getEntityById(id) {
        return this.categoryRepo.getById(id);
    }
    async getById(id) {
        const foundCategory = await this.categoryRepo.getById(id);
        const categoryDTO = new category_dto_1.CategoryDTO(foundCategory);
        return categoryDTO;
    }
    async getAll(pageOptionsDTO) {
        const pageCategoriesDTO = await this.categoryRepo.getAll(pageOptionsDTO);
        const mappedImageCategories = await Promise.all(pageCategoriesDTO.data.map(async (category) => {
            const images = await this.imageService.getByObject(category.id, image_object_type_enum_1.ImageObjectTypeEnum.CATEGORY, query_type_enum_1.QueryTypeEnum.ALL);
            category.image = images[0];
            return category;
        }));
        pageCategoriesDTO.data = mappedImageCategories;
        return pageCategoriesDTO;
    }
    async create(createCategory, userId) {
        const { name, imageId } = createCategory;
        const category = new category_entity_1.CategoryEntity(name, new Array());
        category.createdBy = userId;
        category.updatedBy = userId;
        const createdCategory = await this.categoryRepo.save(category);
        const assignImage = Object.assign(new update_image_dto_1.UpdateImageDTO, {
            imageIds: [imageId],
            objectId: createdCategory.id,
            objectType: image_object_type_enum_1.ImageObjectTypeEnum.CATEGORY
        });
        const images = await this.imageService.update(assignImage, userId);
        const categoryDTO = new category_dto_1.CategoryDTO(createdCategory, images[0]);
        return categoryDTO;
    }
    async update(id, updateCategory, userId) {
        const foundCategory = await this.categoryRepo.getById(id);
        const category = Object.assign(foundCategory, Object.assign(Object.assign({}, updateCategory), { updatedAt: my_moment_util_1.Moment.getCurrentDate(), updatedBy: userId }));
        const updatedCategory = await this.categoryRepo.save(category);
        const assignImage = Object.assign(new update_image_dto_1.UpdateImageDTO, {
            imageIds: [updateCategory.imageId],
            objectId: updatedCategory.id,
            objectType: image_object_type_enum_1.ImageObjectTypeEnum.CATEGORY
        });
        const images = await this.imageService.update(assignImage, userId);
        const categoryDTO = new category_dto_1.CategoryDTO(updatedCategory, images[0]);
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
    __param(1, (0, common_1.Inject)('IImageService')),
    __metadata("design:paramtypes", [Object, Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map