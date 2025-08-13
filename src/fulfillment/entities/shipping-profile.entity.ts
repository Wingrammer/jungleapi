import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ShippingOption } from './shipping-option.entity';

export type ShippingProfileDocument = ShippingProfile & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret:{ _id?: any; __v?: number; id?: string; password?: string; }) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class ShippingProfile {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `sp_${new Types.ObjectId().toString()}`,
  })
  id: string;

  @Prop({ 
    type: String, 
    required: true,
    index: true 
  })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ 
    type: [{ 
      type: Types.ObjectId, 
      ref: 'ShippingOption' 
    }],
    default: []
  })
  shipping_options: Types.ObjectId[];

  @Prop({ type: Object, default: null })
  metadata: Record<string, any> | null;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;

  // Virtual for populated shipping options
  public shipping_options_details?: ShippingOption[];
}

export const ShippingProfileSchema = SchemaFactory.createForClass(ShippingProfile);

