import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Order } from '../CommandePrincipale/order.entity';
import { Return } from '../Retours&Réclamations/return.entity';
import { OrderExchange } from '../exchange.entity';
import { OrderClaim } from '../Retours&Réclamations/claim.entity';

@Schema({ collection: 'order_transactions', timestamps: true })
export class OrderTransaction {
  @Prop({ type: Number, default: 1 })
  version: number;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  currency_code: string;

  @Prop({ type: String, default: null })
  reference: string | null;

  @Prop({ type: String, default: null })
  reference_id: string | null;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order', required: true })
  order: Order | Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Return', default: null })
  return: Return | Types.ObjectId | null;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'OrderExchange', default: null })
  exchange: OrderExchange | Types.ObjectId | null;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'OrderClaim', default: null })
  claim: OrderClaim | Types.ObjectId | null;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;

}

export type OrderTransactionDocument = OrderTransaction & Document;
export const OrderTransactionSchema = SchemaFactory.createForClass(OrderTransaction);
