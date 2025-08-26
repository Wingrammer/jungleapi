import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('image')
export class ImageController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  // POST: /image/upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Aucune image téléchargée', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.cloudinaryService.uploadImage(file.path);
      return {
        message: 'Image téléchargée avec succès',
        url: result.secure_url, // Retourne l'URL sécurisée de l'image
      };
    } catch (error) {
        console.error('Error de telechargemt:', error)
      throw new HttpException('Échec du téléchargement de l\'image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
