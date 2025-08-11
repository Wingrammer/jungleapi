import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';

@Schema({
  timestamps: true,
  collection: 'product_tag' // matches the original tableName
})
export class ProductTag extends Document {
  @Prop({
    required: true,
    index: true,
    unique: true
  })
  value: string; // searchable and unique

  @Prop({ type: Object })
  metadata: Record<string, any>; // nullable

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[]; // manyToMany relationship
}

export const ProductTagSchema = SchemaFactory.createForClass(ProductTag);

