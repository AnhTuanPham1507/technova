import { IImageService } from "@modules/images/services/image.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import {  Cron, CronExpression } from '@nestjs/schedule';

export interface ICronjobService {
    executeDeleteImages(): Promise<void>;
}

@Injectable()
export class CronjobService {
    private logger = new Logger(CronjobService.name);

    constructor(
        @Inject('IImageService')
        private readonly imageService: IImageService
    ){}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async executeDeleteImages(): Promise<void> {
        const deleteImages = await this.imageService.getAllEntity();
        let deletedImageNumber = 0;
        this.logger.log(`Start to scan images not link to object`);
        console.log(deleteImages)
        for(const deleteImage of deleteImages){
            if(!deleteImage.objectId || !deleteImage.objectType){
                await this.imageService.delete(deleteImage.cloudinaryId);
                deletedImageNumber += 1;
                this.logger.log(`Delete image with id ${deleteImage.id} successfully`);
            }
        }
        this.logger.log(`Finish scan. ${deleteImages} image has been deleted`);
    }
}