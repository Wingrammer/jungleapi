// src/types/auth-request.ts
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    sub: string;
    email: string;
    role?: string;
    first_name?: string;
    last_name?: string;
    phone?:string;
    store?: {
      _id: string;
      name?: string;
    };
  };
}
