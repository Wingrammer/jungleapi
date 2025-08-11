import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type OrderExchangeDocument = OrderExchange & Document;

@Schema({
  timestamps: true,
  collection: 'order_exchanges',
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

  }
})
export class OrderExchange {
  @Prop({ type: Number, required: true })
  order_version: number;

  @Prop({ type: Number, unique: true })
  display_id: number;

  @Prop({ type: Boolean, default: null })
  no_notification: boolean | null;

  @Prop({ type: Number, default: null })
  difference_due: number | null;

  @Prop({ type: Boolean, default: false })
  allow_backorder: boolean;

  @Prop({ type: String, default: null })
  created_by: string | null;

  @Prop({ type: Object, default: null })
  metadata: Record<string, any> | null;

  @Prop({ type: Date, default: null })
  canceled_at: Date | null;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;

  // Relations
  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true,
  })
  order: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Return',
    default: null,
    index: true,
  })
  return: Types.ObjectId | null;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'OrderExchangeItem' }],
    default: [],
  })
  additional_items: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'OrderShipping' }],
    default: [],
  })
  shipping_methods: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'OrderTransaction' }],
    default: [],
  })
  transactions: Types.ObjectId[];

  // Virtual ID with prefix
  id: string;
}


export const OrderExchangeSchema = SchemaFactory.createForClass(OrderExchange);
