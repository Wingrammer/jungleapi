// order-exchange-item.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderExchange } from './exchange.entity';
import { OrderLineItem } from './line-item.entity';

type OrderExchangeItemDocument = OrderExchangeItem & Document;

@Schema({
  timestamps: true,
  collection: 'order_exchange_items',
  autoIndex: true,
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
  id: false, // Désactive le virtual getter 'id' par défaut
})
export class OrderExchangeItem {
  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: false })
  note?: string;

  @Prop({ type: Object, required: false })
  metadata?: Record<string, any>;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderExchange',
    required: true,
    index: true,
  })
  exchange: Types.ObjectId | OrderExchange;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderLineItem',
    required: true,
    index: true,
  })
  item: Types.ObjectId | OrderLineItem;

  @Prop({ type: Date, required: false, index: true })
  deleted_at?: Date;

  // Déclaration explicite pour TypeScript
  _id: Types.ObjectId;
  id: string;
}

export const OrderExchangeItemSchema = SchemaFactory.createForClass(OrderExchangeItem);

