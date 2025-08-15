// guards/store.guard.ts
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class StoreGuard implements CanActivate {
  constructor(private readonly storeService: StoreService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) return false;

    const store = await this.storeService.getMyStores(user.id); 

    if (!store)  {
      throw new BadRequestException("sotre pas ")
    };

    // Injection dans la requête
    (request as any).store = store;

    return true;
  }
}
