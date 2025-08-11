import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { OrderShipping } from '../order-shipping.entity';

@Schema({ collection: 'order_shipping_method_adjustments', timestamps: true })
export class OrderShippingMethodAdjustment extends Document {
  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, default: null })
  promotion_id: string | null;

  @Prop({ type: String, default: null })
  code: string | null;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, default: null })
  provider_id: string | null;

  @Prop({ 
    type: SchemaTypes.ObjectId, 
    ref: 'OrderShippingMethod',
    required: true 
  })
  shipping_method: OrderShipping | Types.ObjectId;
}

export const OrderShippingMethodAdjustmentSchema = SchemaFactory.createForClass(OrderShippingMethodAdjustment);

