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
exports.BrandRepository = void 0;
const page_meta_dto_1 = require("../../../../common/dtos/responses/page-meta.dto");
const page_dto_1 = require("../../../../common/dtos/responses/page.dto");
const query_type_enum_1 = require("../../../../constants/enums/query-type.enum");
const brand_dto_1 = require("../../dtos/responses/brand.dto");
const product_dto_1 = require("../../../products/dtos/responses/product.dto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const brand_entity_1 = require("../entities/brand.entity");
let BrandRepository = class BrandRepository {
    constructor(brandRepo) {
        this.brandRepo = brandRepo;
    }
    async getById(id) {
        const brand = await this.brandRepo.findOne({
            where: {
                id
            }
        });
        if (!brand) {
            throw new common_1.NotFoundException(`Brand with id ${id} not found`);
        }
        return brand;
    }
    save(brand) {
        return this.brandRepo.save(brand);
    }
    async getAll(pageOptionsDTO) {
        const query = this.brandRepo.createQueryBuilder('brand');
        query.leftJoinAndSelect('brand.products', 'products');
        query.withDeleted();
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
            query.andWhere('(brand.name ILIKE :q)', {
                q: `%${pageOptionsDTO.q}%`,
            });
        }
        switch (pageOptionsDTO.queryType) {
            case query_type_enum_1.QueryTypeEnum.ALL:
                break;
            case query_type_enum_1.QueryTypeEnum.ACTIVATE:
                query.andWhere('brand.deleted_at is null');
                break;
            case query_type_enum_1.QueryTypeEnum.DEACTIVATE:
                query.andWhere('brand.deleted_at is not null');
                break;
        }
        query.orderBy(`brand.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
        const itemCount = await query.getCount();
        const result = await query.getMany();
        const brandsDTO = result.map((it) => new brand_dto_1.BrandDTO(it, undefined, it.products.map(item => new product_dto_1.ProductDTO(item))));
        const pageMetaDto = new page_meta_dto_1.PageMetaDTO({ pageOptionsDTO, itemCount });
        return new page_dto_1.PageDTO(brandsDTO, pageMetaDto);
    }
};
BrandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(brand_entity_1.BrandEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BrandRepository);
exports.BrandRepository = BrandRepository;
//# sourceMappingURL=brand.repository.js.map