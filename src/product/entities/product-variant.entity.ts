import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';
import { ProductOptionValue } from './product-option-value.entity';
import { MoneyAmount } from 'src/pricing/entities/money-amount.entity';

@Schema({ timestamps: true })
export class ProductVariant extends Document {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ index: true, unique: true, sparse: true })
  sku?: string;

  @Prop({ index: true, unique: true, sparse: true })
  barcode?: string;

  @Prop({ index: true, unique: true, sparse: true })
  ean?: string;

  @Prop({ index: true, unique: true, sparse: true })
  upc?: string;

  @Prop({ default: false })
  allow_backorder: boolean;

  @Prop({ default: true })
  manage_inventory: boolean;

  @Prop()
  hs_code?: string;

  @Prop()
  origin_country?: string;

  @Prop()
  mid_code?: string;

  @Prop()
  material?: string;

  @Prop()
  weight?: number;

  @Prop()
  length?: number;

  @Prop()
  height?: number;

  @Prop()
  width?: number;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop({ default: 0 })
  variant_rank?: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', index: true })
  product?: Product;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductOptionValue' }] })
  options: ProductOptionValue[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MoneyAmount' }] })
  prices: MoneyAmount[]; // ou MoneyAmount[] si tu veux le peupler

}

export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);

