import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApplicationMethod } from './application-method.entity';
import { Promotion } from './promotion.entity';
import { PromotionRuleValue } from './promotion-rule-value.entity';

export enum PromotionRuleOperator {
  IN = 'in',
  NOT_IN = 'not_in',
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'promotion_rule',
})
export class PromotionRule extends Document {
  @Prop()
  description?: string;

  @Prop({ required: true, index: true })
  attribute: string;

  @Prop({
    type: String,
    enum: Object.values(PromotionRuleOperator),
    required: true,
    index: true,
  })
  operator: PromotionRuleOperator;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PromotionRuleValue' }],
  })
  values?: PromotionRuleValue[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Promotion' }],
  })
  promotions?: Promotion[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ApplicationMethod' }],
  })
  method_target_rules?: ApplicationMethod[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ApplicationMethod' }],
  })
  method_buy_rules?: ApplicationMethod[];
}

export const PromotionRuleSchema = SchemaFactory.createForClass(PromotionRule);
