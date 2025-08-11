import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fulfillment } from './fulfillment.entity';

export type FulfillmentItemDocument = FulfillmentItem & Document;

@Schema({
  timestamps: false,
  _id: false
})
export class FulfillmentItem {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `fulit_${Math.random().toString(36).substring(2, 11)}`
  })
  id: string; // Auto-generated with "fulit" prefix

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  sku: string;

  @Prop({ type: String, required: true })
  barcode: string;

  @Prop({ 
    type: Number, 
    required: true,
    validate: {
      validator: (v: number) => Number.isFinite(v) && v > 0,
      message: 'Quantity must be a positive number'
    }
  })
  quantity: number; // bigNumber becomes Number with validation

  @Prop({ type: String })
  line_item_id?: string;

  @Prop({ type: String })
  inventory_item_id?: string;

  @Prop({ 
    type: Types.ObjectId, 
    ref: 'Fulfillment',
    required: true 
  })
  fulfillment: Fulfillment;

  @Prop({ type: Date })
  deleted_at?: Date;
}

export const FulfillmentItemSchema = SchemaFactory.createForClass(FulfillmentItem);

