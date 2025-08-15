import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ProductVariant } from './product-variant.entity';
import { ProductType } from './product-type.entity';
import { ProductTag } from './product-tag.entity';
import { ProductOption } from './product-option.entity';
import { ProductImage } from './product-image.entity';
import { ProductCollection } from './product-collection.entity';


import { Store } from 'src/store/entities/store.entity';
import { ProductCategory } from './product-category.entity';

export enum ProductStatus {
  DRAFT = 'draft',//nomvisible
  PROPOSED = 'proposed',//propose
  PUBLISHED = 'published',//publié
  REJECTED = 'rejected',//regeter par l'admin
}

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: String, required: false, index: true })
  title: string;

  @Prop({ type: String, required: false, unique: true })
  handle: string;

  @Prop({ type: String })
  subtitle: string;

  @Prop({ type: String , required: false})
  description: string;

  @Prop({ type: Boolean, default: false, required: false })
  is_giftcard: boolean;

  @Prop({
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @Prop({ type: String })
  thumbnail: string;

  @Prop({ type: Number, required:false })
  weight: number;

  @Prop({ type: Number, required: false})
  length: number;

  @Prop({ type: Number, required: false})
  height: number;

  @Prop({ type: Number, required: false})
  width: number;

  @Prop({ type: String, required: false})
  origin_country: string;

  @Prop({ type: String , required: false})
  hs_code: string;

  @Prop({ type: String, required:false })
  mid_code: string;

  @Prop({ type: String, required: false })
  material: string;

  @Prop({ type: Boolean, default: true })
  discountable: boolean;

  @Prop({ type: String })
  external_id: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: String, required: false })
  storeId: string; 

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' }])
  variants: Types.ObjectId[]; 

  @Prop({ type: Types.ObjectId, ref: 'ProductType' })
  type: ProductType;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductTag' }] })
  tags: ProductTag[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductOption' }] })
  options: ProductOption[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductImage' }] })
  images: ProductImage[];

  @Prop({ type: Types.ObjectId, ref: 'ProductCollection' })
  Collection: ProductCollection;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductCategory' }] })
  categories: ProductCategory[];

  @Prop({ type: Date })
  deleted_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

