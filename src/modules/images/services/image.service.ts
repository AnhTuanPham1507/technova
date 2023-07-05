import { Moment } from "@/utils/my-moment.util";
import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Inject, Injectable } from "@nestjs/common";
import { ImageEntity } from "../database/entities/image.entity";
import { IImageRepository } from "../database/repositories/image.repository";
import { CreateImageDTO } from "../dtos/requests/create-image.dto";
import { UpdateImageDTO } from "../dtos/requests/update-image.dto";
import { ImageDTO } from "../dtos/responses/image.dto";
import { ICloudinaryService } from "./cloudinary.service";

export interface IImageService {
    create(createImage: CreateImageDTO[], userId: string): Promise<ImageDTO[]>;
    update(updateImage: UpdateImageDTO, userId: string): Promise<ImageDTO[]>; 
    delete(imageId: string): Promise<void>;
    getAllEntity(): Promise<ImageEntity[]>;
    getByObject(objectId: string, objectType: ImageObjectTypeEnum, queryType: QueryTypeEnum): Promise<ImageDTO[]>;
}
@Injectable()
export class ImageService implements IImageService {
    constructor(
        @Inject('ICloudinaryService')
        private readonly cloudinaryService: ICloudinaryService,
        @Inject('IImageRepository')
        private readonly imageRepo: IImageRepository
    ){}

    getAllEntity(): Promise<ImageEntity[]>{
        return this.imageRepo.getAll();
    }

    async getByObject(objectId: string, objectType: ImageObjectTypeEnum, queryType: QueryTypeEnum): Promise<ImageDTO[]>{
        const images = await this.imageRepo.getByObjectId(objectId, objectType, queryType);
        return images.map(image => new ImageDTO(image));
    }

    async create(createImage: CreateImageDTO[], userId: string): Promise<ImageDTO[]> {
        const result = await this.cloudinaryService.uploadFiles(createImage);
        const images = result.map(item => new ImageEntity(`${item.resource_type}/${item.format}`, item.secure_url, item.public_id, userId))
        const createImages = await this.imageRepo.saveMany(images);
        const imagesDTO = createImages.map(image => new ImageDTO(image));
        return imagesDTO;
    }

    async update(updateImage: UpdateImageDTO, userId: string): Promise<ImageDTO[]>{
        const foundImages = await this.imageRepo.getByIds(updateImage.imageIds);
        const updateImages = foundImages.map(image => Object.assign(image,{
            objectId: updateImage.objectId,
            objectType: updateImage.objectType,
            updatedBy: userId,
            updatedAt: Moment.getCurrentDate()
        }))
        const images = await this.imageRepo.saveMany(updateImages);
        const imagesDTO = images.map(image => new ImageDTO(image));
        return imagesDTO;
    }

    async delete(imageId: string): Promise<void>{
        const foundImage = await this.imageRepo.getById(imageId);
        
        await this.cloudinaryService.deleteFile(foundImage.cloudinaryId);
        await this.imageRepo.delete(imageId);
    }
}