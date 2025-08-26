import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(filePath: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(filePath, { folder: 'products' }, (error, result) => {
        if (error) {
          return reject(error);
        }

        if (result && result.secure_url) {
          resolve(result);  // Retourner l'objet complet de Cloudinary
        } else {
          reject(new Error('No secure_url found in Cloudinary response'));
        }
      });
    });
  }
}
