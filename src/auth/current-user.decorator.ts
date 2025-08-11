import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    console.log(data,'data')
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user,'request.user')
    return request.user;

  },
);
