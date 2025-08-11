import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';

@Schema({ 
  timestamps: true,
  collection: 'image' // matches the tableName from original
})
export class ProductImage extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ default: 0 })
  rank: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);

