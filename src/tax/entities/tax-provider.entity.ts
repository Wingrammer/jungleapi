import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TaxRegion } from './tax-region.entity';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
transform: (
  doc,
  ret: { _id: any; __v: number; id?: string }
) => {
  ret.id = `ordsum_${doc._id.toString()}`;
  delete (ret as any)._id;
  delete (ret as any).__v;
  return ret;
}

  },
  collection: 'tax_providers',
})
export class TaxProvider extends Document {
  @Prop({ default: true })
  is_enabled: boolean;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TaxRegion' }],
    default: [],
  })
  regions?: MongooseSchema.Types.ObjectId[];
}

export const TaxProviderSchema = SchemaFactory.createForClass(TaxProvider);
