import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Promotion } from './promotion.entity';
import { PromotionRule } from './promotion-rule.entity';

export enum ApplicationMethodType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping'
}

export enum ApplicationMethodTargetType {
  ORDER = 'order',
  SHIPPING_METHODS = 'shipping_methods',
  ITEMS = 'items'
}

export enum ApplicationMethodAllocation {
  EACH = 'each',
  ACROSS = 'across'
}

@Schema({
  collection: 'promotion_application_method',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class ApplicationMethod extends Document {
  @Prop({
    type: Number,
    get: (v: number) => (v ? Number(v.toString()) : v),
    set: (v: number) => (v ? Number(v.toString()) : v)
  })
  value?: number;

  @Prop({ index: true })
  currency_code?: string;

  @Prop()
  max_quantity?: number;

  @Prop()
  apply_to_quantity?: number;

  @Prop()
  buy_rules_min_quantity?: number;

  @Prop({
    type: String,
    enum: Object.values(ApplicationMethodType),
    required: true
  })
  type: ApplicationMethodType;

  @Prop({
    type: String,
    enum: Object.values(ApplicationMethodTargetType),
    required: true
  })
  target_type: ApplicationMethodTargetType;

  @Prop({
    type: String,
    enum: Object.values(ApplicationMethodAllocation)
  })
  allocation?: ApplicationMethodAllocation;

  @Prop({
    type: Types.ObjectId,
    ref: 'Promotion',
    required: true
  })
  promotion: Promotion;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'PromotionRule' }],
    default: []
  })
  target_rules: PromotionRule[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'PromotionRule' }],
    default: []
  })
  buy_rules: PromotionRule[];
}

export const ApplicationMethodSchema = SchemaFactory.createForClass(ApplicationMethod);
