import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from './address.entity';
import { CreditLine } from './credit-line.entity';
import { LineItem } from './line-item.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { ShippingMethod } from './shipping-method.entity';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true, unique: true })
  id: string; 

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  region_id: string;

  @Prop({ type: String })
  sales_channel_id: string;

  @Prop({ type: String })
  currency_code: string;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  shipping_address: Address;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  billing_address: Address;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'LineItem' }] })
  items: LineItem[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CreditLine' }] })
  credit_lines: CreditLine[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ShippingMethod' }] })
  shipping_methods: ShippingMethod[];

  @Prop({ default: 0 })
  subtotal: number;

  @Prop({ default: 0 })
  tax_total: number;

  @Prop({ default: 0 })
  discount_total: number;

  @Prop({ default: 0 })
  shipping_total: number;

  @Prop({ default: 0 })
  total: number;

  @Prop({ type: Date })
  completed_at: Date;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop()
  deleted_at: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
