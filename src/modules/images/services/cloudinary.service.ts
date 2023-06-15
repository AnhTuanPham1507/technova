import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export interface ICloudinaryService {
  uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]>;
  deleteFile(cloudinaryId: string): Promise<any>;
}

@Injectable()
export class CloudinaryService implements ICloudinaryService{
  constructor(){}

  uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]>{
    const uploadImagePromises = files.map(file => new Promise<CloudinaryResponse>(

        (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      }
    ));

    return Promise.all(uploadImagePromises)
  }

  deleteFile(cloudinaryId: string): Promise<any> {
    return cloudinary.uploader.destroy(cloudinaryId);
  }
}