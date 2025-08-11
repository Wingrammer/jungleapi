import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderLineItemTaxLine } from './Taxes&Adjustments/line-item-tax-line.entity';
import { Product } from 'src/product/entities/product.entity';
import { OrderLineItemAdjustment } from './Taxes&Adjustments/line-item-adjustment.entity';

@Schema({
  timestamps: true,
  collection: 'order_line_items',
  autoIndex: true,
  toJSON: {
transform: (
  doc,
  ret: { _id?: any; __v?: number; id?: string }
) => {
  ret.id = `ordsum_${doc._id.toString()}`;
  delete ret._id;
  delete ret.__v;
  return ret;
}

  }
})
export class OrderLineItem extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;


  @Prop({ type: String, default: null })
  subtitle: string | null;

  @Prop({ type: String, default: null })
  thumbnail: string | null;

  @Prop({ type: String, default: null, index: true })
  variant_id: string | null;

  @Prop({ type: String, default: null, index: true })
  product_id: string | null;

  @Prop({ type: String, default: null })
  product_title: string | null;

  @Prop({ type: String, default: null })
  product_description: string | null;

  @Prop({ type: String, default: null })
  product_subtitle: string | null;

  @Prop({ type: String, default: null })
  product_type: string | null;

  @Prop({ type: String, default: null, index: true })
  product_type_id: string | null;

  @Prop({ type: String, default: null })
  product_collection: string | null;

  @Prop({ type: String, default: null })
  product_handle: string | null;

  @Prop({ type: String, default: null })
  variant_sku: string | null;

  @Prop({ type: String, default: null })
  variant_barcode: string | null;

  @Prop({ type: String, default: null })
  variant_title: string | null;

  @Prop({ type: Object, default: null })
  variant_option_values: Record<string, any> | null;

  @Prop({ type: Boolean, default: true })
  requires_shipping: boolean;

  @Prop({ type: Boolean, default: false })
  is_giftcard: boolean;

  @Prop({ type: Boolean, default: true })
  is_discountable: boolean;

  @Prop({ type: Boolean, default: false })
  is_tax_inclusive: boolean;

  @Prop({ type: String, default: null })
  compare_at_unit_price: string | null;

  @Prop({ type: String, default: null })
  unit_price: string | null;

  @Prop({ type: Boolean, default: false })
  is_custom_price: boolean;

  @Prop({ type: Object, default: null })
  metadata: Record<string, any> | null;

  @Prop({ 
    type: [{ type: Types.ObjectId, ref: 'OrderLineItemTaxLine' }],
    default: [] 
  })
  tax_lines: Types.ObjectId[] | OrderLineItemTaxLine[];

  @Prop({ 
    type: [{ type: Types.ObjectId, ref: 'OrderLineItemAdjustment' }],
    default: [] 
  })
  adjustments: Types.ObjectId[] | OrderLineItemAdjustment[];

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;
}

export const OrderLineItemSchema = SchemaFactory.createForClass(OrderLineItem);

