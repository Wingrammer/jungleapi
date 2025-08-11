import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customer.entity';
import { CustomerGroup } from './customer-group.entity';

export type CustomerGroupCustomerDocument = CustomerGroupCustomer & Document;

@Schema({
  timestamps: true,  // Ajoute created_at et updated_at
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class CustomerGroupCustomer {
  @Prop({ required: true, unique: true })
  id: string; // Préfixe "cusgc" généré automatiquement

  @Prop()
  created_by: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ 
    type: Types.ObjectId, 
    ref: 'Customer',
    required: true 
  })
  customer: Customer;

  @Prop({ 
    type: Types.ObjectId, 
    ref: 'CustomerGroup',
    required: true 
  })
  customer_group: CustomerGroup;

  @Prop()
  deleted_at: Date;
}

export const CustomerGroupCustomerSchema = SchemaFactory.createForClass(CustomerGroupCustomer);

