import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TaxProvider } from './tax-provider.entity';
import { TaxRate } from './tax-rate.entity';

@Schema({
  timestamps: true,
  collection: 'tax_regions',
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class TaxRegion extends Document {
  @Prop({ required: true, index: true })
  country_code: string;

  @Prop({ type: String, default: null, index: true })
  province_code?: string;

  @Prop({ type: Object, default: null })
  metadata?: Record<string, unknown>;

  @Prop({ type: String, default: null })
  created_by?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TaxProvider', default: null })
  provider?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TaxRegion', default: null })
  parent?: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TaxRegion' }],
    default: [],
  })
  children?: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TaxRate' }],
    default: [],
  })
  tax_rates?: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Date, default: null })
  deleted_at?: Date;
}

export const TaxRegionSchema = SchemaFactory.createForClass(TaxRegion);

