import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';

@Schema({ timestamps: true })
export class ProductCollection extends Document {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, index: true, unique: true })
  handle: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const ProductCollectionSchema = SchemaFactory.createForClass(ProductCollection);

