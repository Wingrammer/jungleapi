import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CustomerAddress } from './address.entity';
import { CustomerGroupCustomer } from './customer-group-customer.entity';

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class Customer {
  @Prop({ required: true, unique: true })
  id: string; // Auto-generated with "cus" prefix


  @Prop({ type: String, index: true })
  first_name: string;

  @Prop({ type: String, index: true })
  last_name: string;

  @Prop({ 
    type: String, 
    index: true,
    sparse: true // Allows multiple nulls for unique index
  })
  email: string;

  @Prop({ type: String, index: true })
  phone: string;

  @Prop({ default: false })
  has_account: boolean;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop()
  created_by: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CustomerGroupCustomer' }] })
    customers: CustomerGroupCustomer[];

  // Many-to-Many through pivot table
  @Prop({ 
    type: [{ 
      type: Types.ObjectId, 
      ref: 'CustomerGroupCustomer' 
    }],
    default: []
  })
  groups: CustomerGroupCustomer[];

  // One-to-Many relationship
  @Prop({ 
    type: [{ 
      type: Types.ObjectId, 
      ref: 'CustomerAddress' 
    }],
    default: []
  })
  addresses: CustomerAddress[];

  @Prop()
  deleted_at: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
