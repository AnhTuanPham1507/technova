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
exports.ProductRepository = void 0;
const page_meta_dto_1 = require("../../../../common/dtos/responses/page-meta.dto");
const page_dto_1 = require("../../../../common/dtos/responses/page.dto");
const query_type_enum_1 = require("../../../../constants/enums/query-type.enum");
const product_dto_1 = require("../../dtos/responses/product.dto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
let ProductRepository = class ProductRepository {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    save(product) {
        return this.productRepo.save(product);
    }
    async getAll(pageOptionsDTO) {
        const query = this.productRepo.createQueryBuilder('product');
        query.leftJoinAndSelect('product.category', 'category');
        query.leftJoinAndSelect('product.brand', 'brand');
        query.withDeleted();
        if (pageOptionsDTO.q && pageOptionsDTO.q.length > 0) {
            query.andWhere('(product.name ILIKE :q)', {
                q: `%${pageOptionsDTO.q}%`,
            });
        }
        switch (pageOptionsDTO.queryType) {
            case query_type_enum_1.QueryTypeEnum.ALL:
                break;
            case query_type_enum_1.QueryTypeEnum.ACTIVATE:
                query.andWhere('product.deleted_at is null');
                break;
            case query_type_enum_1.QueryTypeEnum.DEACTIVATE:
                query.andWhere('product.deleted_at is not null');
                break;
        }
        query.orderBy(`moment.${pageOptionsDTO.orderBy}`, pageOptionsDTO.order);
        query.skip(pageOptionsDTO.skip);
        query.take(pageOptionsDTO.take);
        const itemCount = await query.getCount();
        const result = await query.getMany();
        const productDTO = result.map((it) => new product_dto_1.ProductDTO(it));
        const pageMetaDto = new page_meta_dto_1.PageMetaDTO({ pageOptionsDTO, itemCount });
        return new page_dto_1.PageDTO(productDTO, pageMetaDto);
    }
    async getById(id) {
        const product = await this.productRepo.findOne({
            where: {
                id
            }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} can't be found`);
        }
        return product;
    }
    getByIds(ids) {
        return this.productRepo.find({
            where: {
                id: (0, typeorm_2.In)(ids)
            }
        });
    }
};
ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map