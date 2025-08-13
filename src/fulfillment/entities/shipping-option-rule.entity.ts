import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ShippingOption } from './shipping-option.entity';

export enum RuleOperator {
  IN = 'in',
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  NIN = 'nin'
}

export type ShippingOptionRuleDocument = ShippingOptionRule & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret:{ _id?: any; __v?: number; id?: string; password?: string; }) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class ShippingOptionRule {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `sorul_${new Types.ObjectId().toString()}`,
  })
  id: string;

  @Prop({ type: String, required: true })
  attribute: string;

  @Prop({
    type: String,
    enum: RuleOperator,
    required: true
  })
  operator: RuleOperator;

  @Prop({ type: Object, default: null })
  value: any | null;

  @Prop({ 
    type: Types.ObjectId, 
    ref: 'ShippingOption',
    required: true
  })
  shipping_option: Types.ObjectId | ShippingOption;

  // Virtual for populated shipping option
  public shipping_option_details?: ShippingOption;
}

export const ShippingOptionRuleSchema = SchemaFactory.createForClass(ShippingOptionRule);

