import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';

@Schema({ timestamps: true })
export class ProductCategory extends Document {
  @Prop()
  name: string;

  @Prop({ index: true })
  description: string;

  @Prop({ index: true, unique: true })
  handle: string;



  @Prop({ type: Types.ObjectId, ref: 'ProductCategory' })
  parent_category: ProductCategory;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductCategory' }] })
  category_children: ProductCategory[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
