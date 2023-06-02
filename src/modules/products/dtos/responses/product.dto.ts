import { AbstractDTO } from "@common/dtos/abstract.dto";
import { BrandDTO } from "@modules/brands/dtos/responses/brand.dto";
import { CategoryDTO } from "@modules/categories/dtos/responses/category.dto";
import { ProductEntity } from "@modules/products/database/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { CommentDTO } from "./comment.dto";
import { DiscountDTO } from "./discount.dto";
import { ProductBenefitDTO } from "./product-benefit.dto";
import { ProductPackageDTO } from "./product-package.dto";
import { ProductTagDTO } from "./product-tag.dto";
import { ReviewDTO } from "./review.dto";

export class ProductDTO extends AbstractDTO{
    @ApiProperty({
        name: 'name',
        example: 'Microsoft office'
    })
    name: string;

    @ApiProperty({
        name: 'description',
        type: 'text',
        example: 'Sản phẩm tốt'
    })
    description: string;

    @ApiProperty({
        name: 'brand',
        type: BrandDTO
    })
    brand: BrandDTO | null;

    @ApiProperty({
        name: 'category',
        type: CategoryDTO
    })
    category: CategoryDTO | null;

    @ApiProperty({
        name: 'discount',
        type: DiscountDTO
    })
    discount: DiscountDTO | null;

    @ApiProperty({
        name: 'tags',
        type: ProductTagDTO,
        isArray: true
    })
    tags: ProductTagDTO[];

    @ApiProperty({
        name: 'benefits',
        type: ProductBenefitDTO,
        isArray: true
    })
    benefits: ProductBenefitDTO[];

    @ApiProperty({
        name: 'packages',
        type: ProductPackageDTO,
        isArray: true
    })
    packages: ProductPackageDTO[];

    @ApiProperty({
        name: 'reviews',
        type: ReviewDTO,
        isArray: true
    })
    reviews: ReviewDTO[];

    @ApiProperty({
        name: 'comments',
        type: CommentDTO,
        isArray: true
    })
    comments: CommentDTO[];

    constructor(product: ProductEntity){
        super(product);
        this.name = product.name;
        this.description = product.description;
        this.brand = product.brand ? new BrandDTO(product.brand): null;
        this.category = product.category ? new CategoryDTO(product.category) : null;
        this.discount = product.discount ? new DiscountDTO(product.discount): null;
        this.benefits = product.benefits.map(benefit => new ProductBenefitDTO(benefit));
        this.comments = product.comments.map(comment => new CommentDTO(comment));
        this.packages = product.packages.map(productPackage => new ProductPackageDTO(productPackage));
        this.reviews = product.reviews.map(review => new ReviewDTO(review));
        this.tags = product.tags.map(tag => new ProductTagDTO(tag));
    }
}