import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Price } from './price.entity';

export enum PricingRuleOperator {
  EQ = 'eq',         // Equal
  NE = 'ne',         // Not equal
  GT = 'gt',         // Greater than
  GTE = 'gte',       // Greater than or equal
  LT = 'lt',         // Less than
  LTE = 'lte',       // Less than or equal
  IN = 'in',         // In
  NOT_IN = 'not_in', // Not in
}

@Schema({ timestamps: true })
export class PriceRule extends Document {
  @Prop({ type: String, required: true })
  attribute: string;

  @Prop({ type: String, required: true })
  value: string;

  @Prop({
    type: String,
    enum: Object.values(PricingRuleOperator),
    default: PricingRuleOperator.EQ,
  })
  operator: PricingRuleOperator;

  @Prop({ type: Number, default: 0 })
  priority: number;

  @Prop({ type: Types.ObjectId, ref: 'Price', required: true })
  price: Price;
  @Prop({ type: Date, default: null })
  deleted_at?: Date | null;

}

export const PriceRuleSchema = SchemaFactory.createForClass(PriceRule);

