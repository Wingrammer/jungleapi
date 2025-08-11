import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Price } from './price.entity';
import { PriceListRule } from './price-list-rule.entity';

export enum PriceListStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
}

export enum PriceListType {
  SALE = 'sale',
  OVERRIDE = 'override',
}

@Schema({ timestamps: true })
export class PriceList extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(PriceListStatus),
    default: PriceListStatus.DRAFT,
  })
  status: PriceListStatus;

  @Prop({
    type: String,
    enum: Object.values(PriceListType),
    default: PriceListType.SALE,
  })
  type: PriceListType;

  @Prop({ type: Date })
  starts_at: Date;

  @Prop({ type: Date })
  ends_at: Date;

  @Prop({ type: Number, default: 0 })
  rules_count: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Price' }] })
  prices: Price[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PriceListRule' }] })
  price_list_rules: PriceListRule[];
}

export const PriceListSchema = SchemaFactory.createForClass(PriceList);

