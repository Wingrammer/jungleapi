import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'cart_shipping_method',
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})
export class ShippingMethod {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, default: null })
  description: Record<string, any> | null;

  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @Prop({ default: false })
  is_tax_inclusive: boolean;

  @Prop({ default: false })
  is_custom_amount: boolean;

  @Prop()
  shipping_option_id: string;

  @Prop({ type: Object, default: null })
  data: Record<string, any> | null;

  @Prop({ type: Object, default: null })
  metadata: Record<string, any> | null;

  @Prop({ type: Types.ObjectId, ref: 'Cart', required: true })
  cart: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ShippingMethodTaxLine' }], default: [] })
  tax_lines: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ShippingMethodAdjustment' }], default: [] })
  adjustments: Types.ObjectId[];

  @Prop()
  deleted_at: Date;



}

export type ShippingMethodDocument = ShippingMethod & Document;
export const ShippingMethodSchema = SchemaFactory.createForClass(ShippingMethod);
