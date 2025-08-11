import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PricePreference extends Document {
  @Prop({ type: String, required: true })
  attribute: string;

  @Prop({ type: String })
  value: string;

  @Prop({ type: Boolean, default: false })
  is_tax_inclusive: boolean;

  @Prop({ type: Date })
  deleted_at: Date;
}

export const PricePreferenceSchema = SchemaFactory.createForClass(PricePreference);

