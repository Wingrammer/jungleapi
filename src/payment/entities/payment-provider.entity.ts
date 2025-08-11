import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PaymentCollection } from './payment-collection.entity';

export type PaymentProviderDocument = PaymentProvider & Document;

@Schema({ timestamps: true })
export class PaymentProvider {
  @Prop({ type: Boolean, default: true }) // is_enabled
  is_enabled: boolean;

  // Many-to-Many relationship with PaymentCollection
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PaymentCollection' }],
    default: [],
  })
  payment_collections: PaymentCollection[];
}

export const PaymentProviderSchema = SchemaFactory.createForClass(PaymentProvider);