import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from './order.entity';
import { OrderLineItem } from '../line-item.entity';

export type OrderItemDocument = OrderItem & Document;

@Schema({
  timestamps: true,
  collection: 'order_items',
  toJSON: {
    virtuals: true,
transform: (
  doc,
  ret: { _id?: any; __v?: number; id?: string }
) => {
  ret.id = `ordsum_${doc._id.toString()}`;
  delete ret._id;
  delete ret.__v;
  return ret;
}

  },
})
export class OrderItem {
  @Prop({ default: 1 })
  version: number;

  @Prop({ type: String })
  unit_price?: string;

  @Prop({ type: String })
  compare_at_unit_price?: string;

  @Prop({ type: String, required: true }) 
  quantity: string;

  @Prop({ type: String, default: '0' }) 
  fulfilled_quantity: string;

  @Prop({ type: String, default: '0' }) 
  delivered_quantity: string;

  @Prop({ type: String, default: '0' }) 
  shipped_quantity: string;

  @Prop({ type: String, default: '0' }) 
  return_requested_quantity: string;

  @Prop({ type: String, default: '0' })
  return_received_quantity: string;

  @Prop({ type: String, default: '0' })
  return_dismissed_quantity: string;

  @Prop({ type: String, default: '0' }) 
  written_off_quantity: string;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;

  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
  })
  order: Types.ObjectId | Order;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderLineItem',
    required: true,
  })
  item: Types.ObjectId | OrderLineItem;

  @Prop({ type: Date })
  deleted_at?: Date;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
