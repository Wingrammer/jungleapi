import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// common/guards/owner.guard.ts
@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.user.id;                // injecté par JwtAuthGuard
    const ownerId = request.params.ownerId         // ← on lit l’ID présent dans l’URL
                  ?? request.body.owner
                  ?? request.query.owner;

    // Si aucune info : refuser la requête
    if (!ownerId || ownerId !== userId) return false;
    return true;
  }
}
