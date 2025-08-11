import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductOption } from './product-option.entity';
import { ProductVariant } from './product-variant.entity';

@Schema({ timestamps: true })
export class ProductOptionValue extends Document {
  @Prop({ required: true })
  value: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'ProductOption' })
  option: ProductOption;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductVariant' }] })
  variants: ProductVariant[];
}

export const ProductOptionValueSchema = SchemaFactory.createForClass(ProductOptionValue);

