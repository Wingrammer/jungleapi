import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '../../customer/entities/customer.entity';

export type AddressDocument = Address & Document;

@Schema({ 
  timestamps: true,
  collection: 'cart_address'
})
export class Address {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: false })
  customer?: Types.ObjectId | Customer;

  @Prop()
  company?: string;

  @Prop()
  first_name?: string;

  @Prop()
  last_name?: string;

  @Prop()
  address_1?: string;

  @Prop()
  address_2?: string;

  @Prop()
  city?: string;

  @Prop()
  country_code?: string;

  @Prop()
  province?: string;

  @Prop()
  postal_code?: string;

  @Prop()
  phone?: string;

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;

  @Prop()
  deleted_at?: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

