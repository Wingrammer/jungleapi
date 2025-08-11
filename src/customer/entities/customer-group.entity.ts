import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customer.entity';
import { CustomerGroupCustomer } from './customer-group-customer.entity';

export type CustomerGroupDocument = CustomerGroup & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class CustomerGroup {
  @Prop({ required: true, unique: true })
  id: string; // Préfixe "cusgroup" géré dans le middleware

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop()
  created_by: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CustomerGroupCustomer' }] })
  customers: CustomerGroupCustomer[];

  @Prop()
  deleted_at: Date;
}

export const CustomerGroupSchema = SchemaFactory.createForClass(CustomerGroup);

