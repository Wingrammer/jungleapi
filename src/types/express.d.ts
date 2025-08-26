import { Store } from 'src/store/entities/store.entity'; // adapte ce chemin

declare module 'express' {
  interface Request {
    user?: JwtPayload & { id: string; currentStoreId?: string };
    store?: Store;
  }
}
