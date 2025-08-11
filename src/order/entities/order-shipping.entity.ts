import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from './CommandePrincipale/order.entity';
import { Return } from './Retours&Réclamations/return.entity';
import { OrderExchange } from './exchange.entity';
import { OrderClaim } from './Retours&Réclamations/claim.entity';
import { OrderShippingMethod } from './Taxes&Adjustments/order-shipping-method.entity';

export type OrderShippingDocument = OrderShipping & Document;

@Schema({
  timestamps: true,
  collection: 'order_shippings',
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
export class OrderShipping {
  @Prop({ default: 1 })
  version: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
  })
  order: Types.ObjectId | Order;

  @Prop({
    type: Types.ObjectId,
    ref: 'Return',
  })
  return?: Types.ObjectId | Return;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderExchange',
  })
  exchange?: Types.ObjectId | OrderExchange;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderClaim',
  })
  claim?: Types.ObjectId | OrderClaim;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderShippingMethod',
    required: true,
  })
  shipping_method: Types.ObjectId | OrderShippingMethod;

  @Prop({ type: Date })
  deleted_at?: Date;
}

export const OrderShippingSchema = SchemaFactory.createForClass(OrderShipping);

