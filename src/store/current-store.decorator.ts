// current-store.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Store } from 'src/store/entities/store.entity'; 

export const CurrentStore = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Store => {
    const request = ctx.switchToHttp().getRequest();
    return request.store;
  }
);
