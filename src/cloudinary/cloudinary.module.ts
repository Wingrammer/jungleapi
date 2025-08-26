import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],  // Exporte le service pour qu'il soit utilisé dans d'autres modules
})
export class CloudinaryModule {}
