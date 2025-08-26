import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Cart } from './cart.entity';
import { LineItemAdjustment } from './line-item-adjustment.entity';
import { Product } from 'src/product/entities/product.entity';
import { Variant } from 'src/product/entities/product-variant.entity';
import { LineItemTaxLine } from './line-item-tax-line.entity';

export type LineItemDocument = LineItem & Document;

@Schema({
  timestamps: true,
  collection: 'cart_line_item' // Matching original tableName
})
export class LineItem {
  @Prop({ required: true, unique: true })
  id: string; // Will be prefixed with "cali"

  @Prop({ required: true })
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  thumbnail: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  variant_id: string;

  @Prop()
  product_id: string;

  @Prop()
  product_title: string;

  @Prop()
  product_description: string;

  @Prop()
  product_subtitle: string;

  @Prop()
  product_type: string;

  @Prop({ type: Types.ObjectId, ref: 'ProductVariant', required: true })
  product_variant: Variant | Types.ObjectId[];

  @Prop()
  product_type_id: string;

  @Prop()
  product_collection: string;

  @Prop()
  product_handle: string;

  @Prop()
  variant_sku: string;

  @Prop()
  variant_barcode: string;

  @Prop()
  variant_title: string;

  @Prop({ type: Object })
  variant_option_values: Record<string, any>;

  @Prop({ default: true })
  requires_shipping: boolean;

  @Prop({ default: true })
  is_discountable: boolean;

  @Prop({ default: false })
  is_giftcard: boolean;

  @Prop({ default: false })
  is_tax_inclusive: boolean;

  @Prop({ default: false })
  is_custom_price: boolean;

  @Prop({ type: Number })
  compare_at_unit_price: number;

  @Prop({ type: Number, required: true })
  unit_price: number;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;


  @Prop({ type: [{ type: Types.ObjectId, ref: 'LineItemAdjustment' }] })
  adjustments: LineItemAdjustment[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'LineItemTaxLine' }] })
  tax_lines: LineItemTaxLine[];

  @Prop({ type: Types.ObjectId, ref: 'Cart', required: true })
  cart: Cart;

  @Prop()
  deleted_at: Date;
}

export const LineItemSchema = SchemaFactory.createForClass(LineItem);

