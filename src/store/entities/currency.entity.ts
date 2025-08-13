import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret:{ _id?: any; __v?: number; id?: string; password?: string; }) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  collection: 'store_currencies',
})
export class StoreCurrency extends Document {
  @Prop({ required: true, index: true })
  currency_code: string;

  @Prop({ default: false })
  is_default: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store', default: null })
  store?: MongooseSchema.Types.ObjectId; // Nullable reference
}

export type StoreCurrencyDocument = StoreCurrency & Document;
export const StoreCurrencySchema = SchemaFactory.createForClass(StoreCurrency);