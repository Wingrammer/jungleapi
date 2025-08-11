// order-credit-line.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from '../CommandePrincipale/order.entity';

type OrderCreditLineDocument = OrderCreditLine & Document;

@Schema({
  timestamps: true,
  collection: 'order_credit_lines',
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
export class OrderCreditLine {
  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true,
  })
  order: Types.ObjectId | Order;

  @Prop({
    type: String,
    required: false,
  })
  reference?: string;

  @Prop({
    type: String,
    required: false,
  })
  reference_id?: string;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: Object,
    required: true,
  })
  raw_amount: Record<string, any>;

  @Prop({
    type: Object,
    required: false,
  })
  metadata?: Record<string, any>;

  @Prop({
    type: Date,
    required: false,
    index: true,
  })
  deleted_at?: Date;

  // Déclaration explicite pour TypeScript
  _id: Types.ObjectId;
  id: string;
}

export const OrderCreditLineSchema = SchemaFactory.createForClass(OrderCreditLine);

