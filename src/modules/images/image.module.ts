import { Module } from "@nestjs/common";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from "./services/cloudinary.service";

@Module({
    imports:[],
    providers: [
        {
            provide: 'CLOUDINARY',
            useFactory: () => {
              return cloudinary.config({
                  cloud_name: process.env.CLOUDINARY_NAME,
                  api_key: process.env.CLOUDINARY_API_KEY,
                  api_secret:
                    process.env.CLOUDINARY_API_SECRET,
              });
            },
        },
        {
            provide: 'ICloudinaryService',
            useClass: CloudinaryService
        }
    ],
    controllers: [],
    exports: [
        'CLOUDINARY',
        'ICloudinaryService'
    ]
})
export class ImageModule {}