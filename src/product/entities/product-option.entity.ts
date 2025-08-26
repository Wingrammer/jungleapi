// product-option.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';
import { ProductOptionValue } from './product-option-value.entity';

export type ProductOptionDocument = ProductOption & Document;

@Schema({ timestamps: true })
export class ProductOption extends Document {
  @Prop({ required: true, index: true, enum: ['size', 'color'] })
  title: 'size' | 'color'; // uniquement taille ou couleur

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>; // informations supplémentaires facultatives

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product; // produit parent

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductOptionValue' }] })
  values: ProductOptionValue[]; // valeurs possibles (S, M, L / rouge, bleu, etc.)
}

export const ProductOptionSchema = SchemaFactory.createForClass(ProductOption);
