import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Campaign } from './campaign.entity';

export enum CampaignBudgetType {
  SPEND = 'spend',
  USAGE = 'usage'
}

@Schema({
  collection: 'promotion_campaign_budget',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true
  },
  toObject: {
    virtuals: true,
    getters: true
  }
})
export class CampaignBudget extends Document {
  @Prop({
    type: String,
    enum: Object.values(CampaignBudgetType),
    required: true,
    index: true
  })
  type: CampaignBudgetType;

  @Prop()
  currency_code?: string;

  @Prop({
    type: Number,
    get: (v: number) => (v ? Number(v.toString()) : v),
    set: (v: number) => (v ? Number(v.toString()) : v)
  })
  limit?: number;

  @Prop({
    type: Number,
    default: 0,
    get: (v: number) => (v ? Number(v.toString()) : v),
    set: (v: number) => (v ? Number(v.toString()) : v)
  })
  used: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Campaign',
    required: true
  })
  campaign: Campaign;
}

export const CampaignBudgetSchema = SchemaFactory.createForClass(CampaignBudget);

