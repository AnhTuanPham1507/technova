import { Inject, Injectable } from "@nestjs/common";
import { CreateImageDTO } from "../dtos/requests/create-image.dto";
import { ICloudinaryService } from "./cloudinary.service";

export interface IImageService {

}

@Injectable()
export class ImageService implements IImageService {
    constructor(
        @Inject('ICloudinaryService')
        private readonly cloudinaryService: ICloudinaryService
    ){}

    // create(createImages: CreateImageDTO[]): Promise<CreateImageDTO> {
    //     const result = await this.cloudinaryService.uploadFiles()
    // }
}