import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Utilisez une interface pour éviter les imports circulaires
export type ShippingMethodAdjustmentDocument = ShippingMethodAdjustment & Document;

@Schema({
  timestamps: true,
  collection: 'cart_shipping_method_adjustments',
  autoIndex: true
})
export class ShippingMethodAdjustment {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  id: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  promotion_code?: string;

  @Prop({ 
    type: Number,
    required: true,
    min: 0
  })
  amount: number;

  @Prop({ type: String })
  provider_id?: string;

  @Prop({ type: String })
  promotion_id?: string;

  @Prop({ type: String, enum: ['discount', 'fee', 'other'], default: 'discount' })
  type?: string;

  @Prop({ type: Boolean, default: false })
  is_discount?: boolean;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop({ 
    type: Types.ObjectId, 
    ref: 'ShippingMethod', 
    required: true,
    index: true 
  })
  shipping_method: Types.ObjectId;

  @Prop({ type: Date, default: null })
  deleted_at?: Date | null;
}

export const ShippingMethodAdjustmentSchema = SchemaFactory.createForClass(ShippingMethodAdjustment);
