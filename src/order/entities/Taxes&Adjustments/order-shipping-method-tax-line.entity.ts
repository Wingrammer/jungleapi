import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { OrderShippingMethod } from './order-shipping-method.entity';

@Schema({ collection: 'order_shipping_method_tax_lines', timestamps: true })
export class OrderShippingMethodTaxLine extends Document {
  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, default: null })
  tax_rate_id: string | null;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: Number, required: true })
  rate: number;

  @Prop({ type: String, default: null })
  provider_id: string | null;

  @Prop({ 
    type: SchemaTypes.ObjectId, 
    ref: 'OrderShippingMethod',
    required: true 
  })
  shipping_method: OrderShippingMethod | Types.ObjectId;
}

export const OrderShippingMethodTaxLineSchema = SchemaFactory.createForClass(OrderShippingMethodTaxLine);
