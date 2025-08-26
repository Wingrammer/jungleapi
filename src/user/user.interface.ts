// user.interface.ts
import { Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  email: string;
  role: string;
  store: Types.ObjectId;  // Référence vers la boutique
  first_name?: string;
  last_name?: string;
  phone?: string;
  customerGroup?: Types.ObjectId;

}
