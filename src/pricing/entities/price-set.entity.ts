import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Price } from './price.entity';

@Schema({ timestamps: true })
export class PriceSet extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Price' }] })
  prices: Price[];
}

export const PriceSetSchema = SchemaFactory.createForClass(PriceSet);
