import { AuthModule } from "@modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { v2 as cloudinary } from 'cloudinary';
import { ImageController } from "./controllers/image.controller";
import { ImageEntity } from "./database/entities/image.entity";
import { ImageRepository } from "./database/repositories/image.repository";
import { CloudinaryService } from "./services/cloudinary.service";
import { ImageService } from "./services/image.service";
@Module({
    imports:[
        TypeOrmModule.forFeature([
            ImageEntity
        ]),
        AuthModule
    ],
    providers: [
        {
            provide: 'CLOUDINARY',
            useFactory: () => {
              return cloudinary.config({
                  cloud_name: 'quanglong1150',
                  api_key: '527374515711284',
                  api_secret: '2kA3NFsnfQyHcPkLoVjBjCsMhCo'
              });
            },
        },
        {
            provide: 'IImageRepository',
            useClass: ImageRepository
        },
        {
            provide: 'ICloudinaryService',
            useClass: CloudinaryService
        },
        {
            provide: 'IImageService',
            useClass: ImageService
        }
    ],
    controllers: [ImageController],
    exports: [
        'CLOUDINARY',
        'ICloudinaryService',
        'IImageService',
        'IImageRepository'
    ]
})
export class ImageModule {}