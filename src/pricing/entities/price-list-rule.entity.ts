import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PriceList } from './price-list.entity';

export type PriceListRuleDocument = PriceListRule & Document;

@Schema({ timestamps: true })
export class PriceListRule {
  @Prop({ type: String, required: true, index: true }) // attribute
  attribute: string;

  @Prop({ type: Object, default: null }) // value (JSON)
  value?: any | null;

@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PriceList', required: true })
  price_list: MongooseSchema.Types.ObjectId | PriceList;

  @Prop({ type: Date, default: null }) // Soft delete
  deleted_at?: Date | null;
}

export const PriceListRuleSchema = SchemaFactory.createForClass(PriceListRule);

