import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { OrderShippingMethodAdjustment } from './order-shipping-method-adjustment.entity';
import { OrderShippingMethodTaxLine } from './order-shipping-method-tax-line.entity';

@Schema({ timestamps: true })
export class OrderShippingMethod extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  description: any | null;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Boolean, default: false })
  is_tax_inclusive: boolean;

  @Prop({ type: Boolean, default: false })
  is_custom_amount: boolean;

  @Prop({ type: String, default: null })
  shipping_option_id: string | null;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  data: Record<string, any> | null;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  metadata: Record<string, any> | null;

  @Prop({ 
    type: [{ 
      type: SchemaTypes.ObjectId, 
      ref: 'OrderShippingMethodTaxLine' 
    }],
    default: []
  })
  tax_lines: OrderShippingMethodTaxLine[] | Types.ObjectId[];

  @Prop({ 
    type: [{ 
      type: SchemaTypes.ObjectId, 
      ref: 'OrderShippingMethodAdjustment' 
    }],
    default: []
  })
  adjustments: OrderShippingMethodAdjustment[] | Types.ObjectId[];
}

export const OrderShippingMethodSchema = SchemaFactory.createForClass(OrderShippingMethod);

