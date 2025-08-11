import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// auth/guards/vendor.guard.ts
@Injectable()
export class VendorGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user?.role === 'VENDOR';
  }
}
