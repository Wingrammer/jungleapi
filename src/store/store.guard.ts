import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class StoreGuard implements CanActivate {
  constructor(private readonly storeService: StoreService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload & { id: string; currentStoreId?: string };

    if (!user || !user.id) {
      throw new BadRequestException("Utilisateur non trouvé.");
    }

    const currentStoreId = user.currentStoreId;

    if (!currentStoreId) {
      throw new BadRequestException("Aucune boutique active sélectionnée.");
    }

    const store = await this.storeService.getStoreByIdAndUser(currentStoreId, user.id);

    if (!store) {
      throw new BadRequestException("Boutique introuvable ou non autorisée.");
    }

    request.store = store; // TypeScript ne se plaint plus si tu as bien étendu express.d.ts

    return true;
  }
}
