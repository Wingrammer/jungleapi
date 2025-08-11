import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';

@Schema({ timestamps: true })
export class ProductType extends Document {
  @Prop({
    required: true,
    unique: true,
    index: true
  })
  value: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);

