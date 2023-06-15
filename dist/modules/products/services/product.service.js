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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../database/entities/product.entity");
const product_dto_1 = require("../dtos/responses/product.dto");
const my_moment_util_1 = require("../../../utils/my-moment.util");
const update_image_dto_1 = require("../../images/dtos/requests/update-image.dto");
const image_object_type_enum_1 = require("../../../constants/enums/image-object-type.enum");
const query_type_enum_1 = require("../../../constants/enums/query-type.enum");
const brand_dto_1 = require("../../brands/dtos/responses/brand.dto");
const category_dto_1 = require("../../categories/dtos/responses/category.dto");
let ProductService = class ProductService {
    constructor(brandService, categoryService, productRepo, imageService) {
        this.brandService = brandService;
        this.categoryService = categoryService;
        this.productRepo = productRepo;
        this.imageService = imageService;
    }
    async create(createProduct, userId) {
        const { brandId, categoryId, description, name, imageId, imageDescriptionIds } = createProduct;
        const brand = await this.brandService.getEntityById(brandId);
        const category = await this.categoryService.getEntityById(categoryId);
        const product = new product_entity_1.ProductEntity(name, description, brand, category);
        product.createdBy = userId;
        product.updatedBy = userId;
        const createdProduct = await this.productRepo.save(product);
        const assignImage = Object.assign(new update_image_dto_1.UpdateImageDTO, {
            imageIds: [imageId],
            objectId: createdProduct.id,
            objectType: image_object_type_enum_1.ImageObjectTypeEnum.PRODUCT
        });
        const images = await this.imageService.update(assignImage, userId);
        const brandDTO = createdProduct.brand ? new brand_dto_1.BrandDTO(createdProduct.brand) : undefined;
        const categoryDTO = createdProduct.category ? new category_dto_1.CategoryDTO(createdProduct.category) : undefined;
        const productDTO = new product_dto_1.ProductDTO(createdProduct, brandDTO, categoryDTO, undefined, images[0]);
        return productDTO;
    }
    async getAll(pageOptions) {
        const pageProductsDTO = await this.productRepo.getAll(pageOptions);
        const mappedImageProducts = await Promise.all(pageProductsDTO.data.map(async (product) => {
            const images = await this.imageService.getByObject(product.id, image_object_type_enum_1.ImageObjectTypeEnum.PRODUCT, query_type_enum_1.QueryTypeEnum.ALL);
            product.image = images[0];
            return product;
        }));
        pageProductsDTO.data = mappedImageProducts;
        return pageProductsDTO;
    }
    async getById(id) {
        const foundProduct = await this.productRepo.getById(id);
        const images = await this.imageService.getByObject(foundProduct.id, image_object_type_enum_1.ImageObjectTypeEnum.PRODUCT, query_type_enum_1.QueryTypeEnum.ALL);
        const imageDTO = images[0];
        const brandDTO = foundProduct.brand ? new brand_dto_1.BrandDTO(foundProduct.brand) : undefined;
        const categoryDTO = foundProduct.category ? new category_dto_1.CategoryDTO(foundProduct.category) : undefined;
        const productDTO = new product_dto_1.ProductDTO(foundProduct, brandDTO, categoryDTO);
        productDTO.image = imageDTO;
        return productDTO;
    }
    async getByIds(ids) {
        const foundProducts = await this.productRepo.getByIds(ids);
        const productsDTO = foundProducts.map(product => new product_dto_1.ProductDTO(product));
        return productsDTO;
    }
    async update(id, updateProduct, userId) {
        const foundProduct = await this.productRepo.getById(id);
        const brand = await this.brandService.getEntityById(updateProduct.brandId);
        const category = await this.categoryService.getEntityById(updateProduct.categoryId);
        const product = Object.assign(foundProduct, Object.assign(Object.assign({}, updateProduct), { brand,
            category, updatedAt: my_moment_util_1.Moment.getCurrentDate(), updatedBy: userId }));
        const updatedProduct = await this.productRepo.save(product);
        const assignImage = Object.assign(new update_image_dto_1.UpdateImageDTO, {
            imageIds: [updateProduct.imageId],
            objectId: updatedProduct.id,
            objectType: image_object_type_enum_1.ImageObjectTypeEnum.PRODUCT
        });
        const images = await this.imageService.update(assignImage, userId);
        const brandDTO = updatedProduct.brand ? new brand_dto_1.BrandDTO(updatedProduct.brand) : undefined;
        const categoryDTO = updatedProduct.category ? new category_dto_1.CategoryDTO(updatedProduct.category) : undefined;
        const productDTO = new product_dto_1.ProductDTO(updatedProduct, brandDTO, categoryDTO, undefined, images[0]);
        return productDTO;
    }
    async delete(id, userId) {
        const foundProduct = await this.productRepo.getById(id);
        const product = Object.assign(foundProduct, Object.assign(Object.assign({}, foundProduct), { deletedAt: my_moment_util_1.Moment.getCurrentDate(), deletedBy: userId }));
        const deletedProduct = await this.productRepo.save(product);
        const productDTO = new product_dto_1.ProductDTO(deletedProduct);
        return productDTO;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => 'IBrandService'))),
    __param(1, (0, common_1.Inject)('ICategoryService')),
    __param(2, (0, common_1.Inject)('IProductRepository')),
    __param(3, (0, common_1.Inject)('IImageService')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map