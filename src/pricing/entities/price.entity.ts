import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PriceSet } from './price-set.entity';
import { PriceRule } from './price-rule.entity';
import { PriceList } from './price-list.entity';
import { Region } from 'src/region/entities/region.entity';
import { Country } from 'src/region/entities/country.entity';
import { ProductVariant } from 'src/product/entities/product-variant.entity';

@Schema({ timestamps: true })
export class Price extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String, required: true })
  currency_code: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Number })
  min_quantity: number;

  @Prop({ type: Number })
  max_quantity: number;

  @Prop({ type: Number, default: 0 })
  rules_count: number;

  @Prop({ type: Types.ObjectId, ref: 'PriceSet', required: true })
  price_set: PriceSet;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PriceRule' }] })
  price_rules: PriceRule[];

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PriceList' })
  price_list: PriceList;

  // Nouveaux champs relationnels
  @Prop({ type: Types.ObjectId, ref: 'Region' })
  region?: Types.ObjectId | Region;

  @Prop({ type: Types.ObjectId, ref: 'Country' })
  country?: Types.ObjectId | Country;

  @Prop({ type: Types.ObjectId, ref: 'ProductVariant' })
  product_variant?: Types.ObjectId | ProductVariant;

  @Prop({ type: Date })
  deleted_at: Date;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
