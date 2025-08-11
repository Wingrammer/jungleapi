import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from '../CommandePrincipale/order.entity';
import { OrderChangeAction } from './order-change-action.entity';

export enum OrderChangeStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
  CANCELED = 'canceled',
}

export type OrderChangeDocument = OrderChange & Document;

@Schema({
  timestamps: true,
  collection: 'order_changes',
  toJSON: {
    virtuals: true,
transform: (
  doc,
  ret: { _id: any; __v: number; id?: string }
) => {
  ret.id = `ordsum_${doc._id.toString()}`;
  delete (ret as any)._id;
  delete (ret as any).__v;
  return ret;
}

  },
})
export class OrderChange {
  @Prop({ type: String })
  return_id?: string;

  @Prop({ type: String })
  claim_id?: string;

  @Prop({ type: String })
  exchange_id?: string;

  @Prop({ required: true })
  version: number;

  @Prop({ type: String })
  change_type?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({
    type: String,
    enum: OrderChangeStatus,
    default: OrderChangeStatus.PENDING,
  })
  status: OrderChangeStatus;

  @Prop({ type: String })
  internal_note?: string;

  @Prop({ type: String })
  created_by?: string;

  @Prop({ type: String })
  requested_by?: string;

  @Prop({ type: Date })
  requested_at?: Date;

  @Prop({ type: String })
  confirmed_by?: string;

  @Prop({ type: Date })
  confirmed_at?: Date;

  @Prop({ type: String })
  declined_by?: string;

  @Prop({ type: String })
  declined_reason?: string;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;

  @Prop({ type: Date })
  declined_at?: Date;

  @Prop({ type: String })
  canceled_by?: string;

  @Prop({ type: Date })
  canceled_at?: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
  })
  order: Types.ObjectId | Order;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'OrderChangeAction' }],
    default: [],
  })
  actions: Types.ObjectId[] | OrderChangeAction[];

  @Prop({ type: Date })
  deleted_at?: Date;
}

export const OrderChangeSchema = SchemaFactory.createForClass(OrderChange);

