import { JwtPayload } from '@nestjs/jwt'; // adapte si besoin

declare module 'express' {
  interface Request {
    user?: JwtPayload; // ou ton type user personnalisé
  }
}
