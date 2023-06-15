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
exports.CategoryRepository = void 0;
const page_meta_dto_1 = require("../../../../common/dtos/responses/page-meta.dto");
const page_dto_1 = require("../../../../common/dtos/responses/page.dto");
const query_type_enum_1 = require("../../../../constants/enums/query-type.enum");
const category_dto_1 = require("../../dtos/responses/category.dto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../entities/category.entity");
let CategoryRepository = class CategoryRepository {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async getById(id) {
        const category = await this.categoryRepo.findOne({
            where: {
                id
            }
        });
        if (!category) {
            throw new common_1.NotFoundException(`Cateogory with id ${id} can't be found`);
        }
        return category;
    }
    save(category) {
        return this.categoryRepo.save(category);
    }
    async getAll(pageOptionsDTO) {
        const query = this.categoryRepo.createQueryBuilder('category');
        query.withDeleted();
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
            query.andWhere('(category.name ILIKE :q)', {
                q: `%${pageOptionsDTO.q}%`,
            });
        }
        switch (pageOptionsDTO.queryType) {
            case query_type_enum_1.QueryTypeEnum.ALL:
                break;
            case query_type_enum_1.QueryTypeEnum.ACTIVATE:
                query.andWhere('category.deleted_at is null');
                break;
            case query_type_enum_1.QueryTypeEnum.DEACTIVATE:
                query.andWhere('category.deleted_at is not null');
                break;
        }
        query.orderBy(`category.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
        const itemCount = await query.getCount();
        const result = await query.getMany();
        const categoriesDTO = result.map((it) => new category_dto_1.CategoryDTO(it));
        const pageMetaDto = new page_meta_dto_1.PageMetaDTO({ pageOptionsDTO, itemCount });
        return new page_dto_1.PageDTO(categoriesDTO, pageMetaDto);
    }
};
CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map