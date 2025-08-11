import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrencyDocument = Currency & Document;

@Schema({
  timestamps: false,
  autoIndex: true,
})
export class Currency {
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  code: string; // ex: "USD"

  @Prop({ type: String, required: true })
  symbol: string; // ex: "$"

  @Prop({ type: String, required: true })
  symbol_native: string; // Local symbol, ex: "$"

  @Prop({ type: String, required: true, index: true })
  name: string; // ex: "US Dollar"

  @Prop({ type: Number, required: true, default: 0 })
  decimal_digits: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
    validate: {
      validator: (v: number) => Number.isFinite(v),
      message: 'Rounding must be a finite number',
    },
  })
  rounding: number;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
 