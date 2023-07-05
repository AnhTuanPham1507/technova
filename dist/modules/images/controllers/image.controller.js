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
exports.ImageController = void 0;
const openapi = require("@nestjs/swagger");
const check_filetype_1 = require("../../../utils/check-filetype");
const role_enum_1 = require("../../../constants/enums/role.enum");
const role_decorator_1 = require("../../../decorators/role.decorator");
const role_guard_1 = require("../../auth/guards/role.guard");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const update_image_dto_1 = require("../dtos/requests/update-image.dto");
const image_dto_1 = require("../dtos/responses/image.dto");
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    createImages(files, req) {
        return this.imageService.create(files, req.user.id);
    }
    updateImages(updateImageDTO, req) {
        return this.imageService.update(updateImageDTO, req.user.id);
    }
    deleteImage(id) {
        return this.imageService.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'string',
                    format: 'binary'
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        type: image_dto_1.ImageDTO,
        isArray: true,
        description: 'Create images successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, {
        fileFilter: check_filetype_1.imageFileFilter,
    })),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 201, type: [require("../dtos/responses/image.dto").ImageDTO] }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "createImages", null);
__decorate([
    (0, common_1.Put)(''),
    (0, swagger_1.ApiOkResponse)({
        type: image_dto_1.ImageDTO,
        isArray: true,
        description: 'Update images successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 200, type: [require("../dtos/responses/image.dto").ImageDTO] }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_image_dto_1.UpdateImageDTO, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "updateImages", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Delete images successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server errors.',
    }),
    (0, role_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "deleteImage", null);
ImageController = __decorate([
    (0, common_1.Controller)('/v1/image'),
    (0, swagger_1.ApiTags)('Image'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __param(0, (0, common_1.Inject)('IImageService')),
    __metadata("design:paramtypes", [Object])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map