import { ImageObjectTypeEnum } from "@constants/enums/image-object-type.enum";
import { QueryTypeEnum } from "@constants/enums/query-type.enum";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageEntity } from "../entities/image.entity";

export interface IImageRepository {
    getById(id: string): Promise<ImageEntity>;
    save(image: ImageEntity): Promise<ImageEntity>;
    getByObjectId(objectId: string, objectType: ImageObjectTypeEnum, queryType: QueryTypeEnum): Promise<ImageEntity[]>
}

@Injectable()
export class ImageRepository implements IImageRepository {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepo: Repository<ImageEntity>
    ){}

    async getById(id: string): Promise<ImageEntity> {
        const image = await this.imageRepo.findOne({
            where:{
                id
            }
        })

        if(!image){
            throw new NotFoundException(`Cateogory with id ${id} can't be found`);
        }

        return image;
    }

    save(image: ImageEntity): Promise<ImageEntity> {
        return this.imageRepo.save(image);
    }

    getByObjectId(objectId: string, objectType: ImageObjectTypeEnum, queryType: QueryTypeEnum): Promise<ImageEntity[]> {
        const query = this.imageRepo.createQueryBuilder('image');
        
        query.where('image.object_id =:objectId',{
            objectId
        });
        query.andWhere('image.object_type =:objectType',{
            objectType
        });

        switch(queryType){
            case QueryTypeEnum.ALL:
              break;
            case QueryTypeEnum.ACTIVATE:
              query.andWhere('image.deleted_at is null');
              break;
            case QueryTypeEnum.DEACTIVATE:
              query.andWhere('image.deleted_at is not null');
              break;
        }

        return query.getMany();
    }
}