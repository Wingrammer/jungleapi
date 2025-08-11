import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../../product/entities/product.entity';
import { Region } from '../../region/entities/region.entity';

export type TaxDocument = Tax & Document;

@Schema({ timestamps: true })
export class Tax {
  @Prop({ required: true })
  rate: number;

  @Prop({ type: Types.ObjectId, ref: 'Region' })
  region: Region;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  products: Product[];
}

export const TaxSchema = SchemaFactory.createForClass(Tax);