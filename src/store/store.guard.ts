// store.guard.ts
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { StoreService } from '../store/store.service';

@Injectable()
export class StoreGuard implements CanActivate {
  constructor(private readonly storeService: StoreService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.role !== 'vendor') return false;

    const store = await this.storeService.findStoreByUserId(user.sub);
    if (!store) {
      throw new NotFoundException("Aucune boutique trouvée pour ce vendeur.");
    }

    request.store = store;
    return true;
  }
}