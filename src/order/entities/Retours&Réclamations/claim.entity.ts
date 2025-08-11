// order-claim.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from '../CommandePrincipale/order.entity';
import { OrderClaimItem } from './claim-item.entity';
import { OrderShipping } from '../order-shipping.entity';
import { Return } from './return.entity';
import { OrderTransaction } from '../Transaction/transaction.entity';

export enum ClaimType {
  REFUND = 'refund',
  REPLACEMENT = 'replacement',
}

type OrderClaimDocument = OrderClaim & Document;

@Schema({
  timestamps: true,
  collection: 'order_claims',
  autoIndex: true,
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
  id: false, // Désactive le virtual getter 'id' par défaut
})
export class OrderClaim {
  @Prop({ type: Number, required: true })
  order_version: number;

  @Prop({ type: Number, unique: true })
  display_id: number;

  @Prop({ type: String, enum: ClaimType, required: true })
  type: ClaimType;

  @Prop({ type: Boolean, required: false })
  no_notification?: boolean;

  @Prop({ type: Number, required: false })
  refund_amount?: number;

  @Prop({ type: String, required: false })
  created_by?: string;

  @Prop({ type: Date, required: false })
  canceled_at?: Date;

  @Prop({ type: Object, required: false })
  metadata?: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true, index: true })
  order: Types.ObjectId | Order;

  @Prop({ type: Types.ObjectId, ref: 'Return', required: false, index: true })
  return?: Types.ObjectId | Return;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderClaimItem' }], default: [] })
  additional_items: Types.ObjectId[] | OrderClaimItem[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderClaimItem' }], default: [] })
  claim_items: Types.ObjectId[] | OrderClaimItem[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderShipping' }], default: [] })
  shipping_methods: Types.ObjectId[] | OrderShipping[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderTransaction' }], default: [] })
  transactions: Types.ObjectId[] | OrderTransaction[];

  @Prop({ type: Date, required: false, index: true })
  deleted_at?: Date;

  // Déclaration explicite pour TypeScript
  _id: Types.ObjectId;
  id: string;
}

export const OrderClaimSchema = SchemaFactory.createForClass(OrderClaim);

