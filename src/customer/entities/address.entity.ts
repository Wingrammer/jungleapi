import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customer.entity';

export type CustomerAddressDocument = CustomerAddress & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class CustomerAddress {
  @Prop({ required: true, unique: true })
  id: string; // Préfixe "cuaddr" généré automatiquement

  @Prop({ type: String, index: true })
  address_name: string;

  @Prop({ default: false })
  is_default_shipping: boolean;

  @Prop({ default: false })
  is_default_billing: boolean;

  @Prop({ type: String, index: true })
  company: string;

  @Prop({ type: String, index: true })
  first_name: string;

  @Prop({ type: String, index: true })
  last_name: string;

  @Prop({ type: String, index: true })
  address_1: string;

  @Prop({ type: String, index: true })
  address_2: string;

  @Prop({ type: String, index: true })
  city: string;

  @Prop({ type: String })
  country_code: string;

  @Prop({ type: String, index: true })
  province: string;

  @Prop({ type: String, index: true })
  postal_code: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer: Customer;

  @Prop()
  deleted_at: Date;
}

export const CustomerAddressSchema = SchemaFactory.createForClass(CustomerAddress);

