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
exports.ImageRepository = void 0;
const query_type_enum_1 = require("../../../../constants/enums/query-type.enum");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const image_entity_1 = require("../entities/image.entity");
let ImageRepository = class ImageRepository {
    constructor(imageRepo) {
        this.imageRepo = imageRepo;
    }
    async getById(id) {
        const image = await this.imageRepo.findOne({
            where: {
                id
            }
        });
        if (!image) {
            throw new common_1.NotFoundException(`Cateogory with id ${id} can't be found`);
        }
        return image;
    }
    save(image) {
        return this.imageRepo.save(image);
    }
    getByObjectId(objectId, objectType, queryType) {
        const query = this.imageRepo.createQueryBuilder('image');
        query.where('image.object_id =:objectId', {
            objectId
        });
        query.andWhere('image.object_type =:objectType', {
            objectType
        });
        switch (queryType) {
            case query_type_enum_1.QueryTypeEnum.ALL:
                break;
            case query_type_enum_1.QueryTypeEnum.ACTIVATE:
                query.andWhere('image.deleted_at is null');
                break;
            case query_type_enum_1.QueryTypeEnum.DEACTIVATE:
                query.andWhere('image.deleted_at is not null');
                break;
        }
        return query.getMany();
    }
};
ImageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.ImageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ImageRepository);
exports.ImageRepository = ImageRepository;
//# sourceMappingURL=image.repository.js.map