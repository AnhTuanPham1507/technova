import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, In, Repository } from "typeorm";
import { ImageEntity } from "../entities/image.entity";

export interface IImageRepository {
    getAll(): Promise<ImageEntity[]>;
    getById(id: string): Promise<ImageEntity>;
    getByIds(ids: string[]): Promise<ImageEntity[]>;
    save(image: ImageEntity): Promise<ImageEntity>;
    saveMany(images: ImageEntity[]): Promise<ImageEntity[]>;
    getByObjectId(objectId: string, objectType: ImageObjectTypeEnum, queryType: QueryTypeEnum): Promise<ImageEntity[]>;
    delete(imageId: string): Promise<DeleteResult>;
}

@Injectable()
export class ImageRepository implements IImageRepository {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepo: Repository<ImageEntity>
    ){}
    getAll(): Promise<ImageEntity[]> {
        return this.imageRepo.find({});
    }

    async getById(id: string): Promise<ImageEntity> {
        const image = await this.imageRepo.findOne({
            where:{
                id
            }
        })

        if(!image){
            throw new NotFoundException(`Image with id ${id} can't be found`);
        }

        return image;
    }

    getByIds(ids: string[]): Promise<ImageEntity[]>{
        return this.imageRepo.find({
            where:{
                id: In(ids)
            }
        })
    }

    save(image: ImageEntity): Promise<ImageEntity> {
        return this.imageRepo.save(image);
    }

    saveMany(images: ImageEntity[]): Promise<ImageEntity[]>{
        return this.imageRepo.save(images);
    }

    getByObjectId(objectId: string, objectType: ImageObjectTypeEnum): Promise<ImageEntity[]> {
        return this.imageRepo.find({
            where: {
                objectId,
                objectType
            },
            order: {
                createdAt: 'DESC'
            }
        })
    }

    delete(imageId: string): Promise<DeleteResult>{
        return this.imageRepo.delete(imageId);
    }
}