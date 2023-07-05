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
exports.BrandController = void 0;
const openapi = require("@nestjs/swagger");
const page_options_dto_1 = require("../../../common/dtos/requests/page-options.dto");
const role_enum_1 = require("../../../constants/enums/role.enum");
const role_decorator_1 = require("../../../decorators/role.decorator");
const role_guard_1 = require("../../auth/guards/role.guard");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_brand_dto_1 = require("../dtos/requests/create-brand.dto");
const update_brand_dto_1 = require("../dtos/requests/update-brand.dto");
const brand_dto_1 = require("../dtos/responses/brand.dto");
let BrandController = class BrandController {
    constructor(brandService) {
        this.brandService = brandService;
    }
    getBrandList(pageOptionsDTO) {
        return this.brandService.getAll(pageOptionsDTO);
    }
    getBrand(id) {
        return this.brandService.getById(id);
    }
    createBrand(body, req) {
        return this.brandService.create(body, req.user.id);
    }
    updateBrand(id, body, req) {
        return this.brandService.update(id, body, req.user.id);
    }
    deleteBrand(id, req) {
        return this.brandService.delete(id, req.user.id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOkResponse)({
        type: brand_dto_1.BrandDTO,
        isArray: true,
        description: 'Got list brand successfully',
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
], BrandController.prototype, "getBrandList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        type: brand_dto_1.BrandDTO,
        description: 'Got brand successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Brand with id ... can`t be found'
    }),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/brand.dto").BrandDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "getBrand", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: create_brand_dto_1.CreateBrandDTO }),
    (0, swagger_1.ApiOkResponse)({
        type: brand_dto_1.BrandDTO,
        description: 'Create brand successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 201, type: require("../dtos/responses/brand.dto").BrandDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDTO, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiBody)({ type: update_brand_dto_1.UpdateBrandDTO }),
    (0, swagger_1.ApiOkResponse)({
        type: brand_dto_1.BrandDTO,
        description: 'Update brand successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Brand with id ... can`t be found'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/brand.dto").BrandDTO }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_brand_dto_1.UpdateBrandDTO, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Delete brand successfully',
        type: brand_dto_1.BrandDTO
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Brand with id ... can`t be found'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 200, type: require("../dtos/responses/brand.dto").BrandDTO }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "deleteBrand", null);
BrandController = __decorate([
    (0, common_1.Controller)('/v1/brand'),
    (0, swagger_1.ApiTags)('Brand'),
    __param(0, (0, common_1.Inject)('IBrandService')),
    __metadata("design:paramtypes", [Object])
], BrandController);
exports.BrandController = BrandController;
//# sourceMappingURL=brand.controller.js.map