import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ShippingOption } from './shipping-option.entity';

export type ShippingOptionTypeDocument = ShippingOptionType & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class ShippingOptionType {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `sotype_${new Types.ObjectId().toString()}`,
  })
  id: string;

  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, required: true })
  code: string;

  // No need for explicit relationship if not used
  // The hasOne relationship will be managed by ShippingOption
}

export const ShippingOptionTypeSchema = SchemaFactory.createForClass(ShippingOptionType);