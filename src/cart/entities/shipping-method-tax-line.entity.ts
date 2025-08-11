import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'cart_shipping_method_tax_line',
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})
export class ShippingMethodTaxLine  {
  @Prop({
    required: true,
    unique: true,
    default: () => `casmtxl_${new Types.ObjectId()}`
  })
  id: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: Number, required: true })
  rate: number;

  @Prop()
  provider_id: string;

  @Prop()
  tax_rate_id: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'ShippingMethod', required: true })
  shipping_method: Types.ObjectId;

  @Prop()
  deleted_at: Date;
}

export const ShippingMethodTaxLineSchema = SchemaFactory.createForClass(ShippingMethodTaxLine);

