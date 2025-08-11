import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PromotionRule } from './promotion-rule.entity';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'promotion_rule_value',
})
export class PromotionRuleValue extends Document {
  @Prop({ required: true })
  value: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PromotionRule',
    required: true,
  })
  promotion_rule: PromotionRule;
}

export const PromotionRuleValueSchema = SchemaFactory.createForClass(PromotionRuleValue);

