// current-store.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentStore = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.store; // injecté par un guard
  }
);
