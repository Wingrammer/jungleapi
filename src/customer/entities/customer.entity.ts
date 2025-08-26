// customer.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/role.enum';

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: true,
  collection: 'customers',
 
})
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, default: Role.CUSTOMER })
  role: Role;

  
}

// Crée le schema
export const CustomerSchema = SchemaFactory.createForClass(Customer);

