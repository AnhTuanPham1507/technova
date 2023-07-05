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
exports.CategoryController = void 0;
const openapi = require("@nestjs/swagger");
const page_options_dto_1 = require("../../../common/dtos/requests/page-options.dto");
const role_enum_1 = require("../../../constants/enums/role.enum");
const role_decorator_1 = require("../../../decorators/role.decorator");
const role_guard_1 = require("../../auth/guards/role.guard");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_category_dto_1 = require("../dtos/requests/create-category.dto");
const update_category_dto_1 = require("../dtos/requests/update-category.dto");
const category_dto_1 = require("../dtos/responses/category.dto");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getCategoryList(pageOptionsDTO) {
        return this.categoryService.getAll(pageOptionsDTO);
    }
    getCategory(id) {
        return this.categoryService.getById(id);
    }
    createCategory(body, req) {
        return this.categoryService.create(body, req.user.id);
    }
    updateCategory(id, body, req) {
        return this.categoryService.update(id, body, req.user.id);
    }
    deleteCategory(id, req) {
        return this.categoryService.delete(id, req.user.id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOkResponse)({
        type: category_dto_1.CategoryDTO,
        isArray: true,
        description: 'Got list category successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        type: category_dto_1.CategoryDTO,
        description: 'Got category successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Category with id ... can`t be found'
    }),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/category.dto").CategoryDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: create_category_dto_1.CreateCategoryDTO }),
    (0, swagger_1.ApiOkResponse)({
        type: category_dto_1.CategoryDTO,
        description: 'Create category successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 201, type: require("../dtos/responses/category.dto").CategoryDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDTO, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiBody)({ type: update_category_dto_1.UpdateCategoryDTO }),
    (0, swagger_1.ApiOkResponse)({
        type: category_dto_1.CategoryDTO,
        description: 'Update category successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Category with id ... can`t be found'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/category.dto").CategoryDTO }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDTO, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Delete category successfully',
        type: category_dto_1.CategoryDTO
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Category with id ... can`t be found'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/category.dto").CategoryDTO }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = __decorate([
    (0, common_1.Controller)('/v1/category'),
    (0, swagger_1.ApiTags)('Category'),
    __param(0, (0, common_1.Inject)('ICategoryService')),
    __metadata("design:paramtypes", [Object])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map