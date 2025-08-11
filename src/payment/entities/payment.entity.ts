import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { PaymentCollection } from './payment-collection.entity';
import { PaymentSession } from './payment-session.entity';
import { Refund } from './refund.entity';
import { Capture } from './capture.entity';

export type PaymentDocument = Payment & Document & { _id: Types.ObjectId };

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: MongooseSchema.Types.Decimal128, required: true }) // amount
  amount: number;

  @Prop({ type: String, required: true }) // currency_code
  currency_code: string;

  @Prop({ type: String, required: true }) // provider_id
  provider_id: string;

  @Prop({ type: Object, default: null }) // data
  data?: Record<string, any> | null;

  @Prop({ type: Object, default: null }) // metadata
  metadata?: Record<string, any> | null;

  @Prop({ type: Date, default: null }) // captured_at
  captured_at?: Date | null;

  @Prop({ type: Date, default: null }) // canceled_at
  canceled_at?: Date | null;

  // Relationships
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'PaymentCollection',
    required: true 
  })
  payment_collection: PaymentCollection;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'PaymentSession',
    default: null 
  })
  payment_session?: PaymentSession | null;

  @Prop({ 
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Refund' }],
    default: [] 
  })
  refunds: Refund[];

  @Prop({ type: String, enum: ['pending', 'captured', 'refunded'], default: 'pending' })
  status: string;


  @Prop({ 
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Capture' }],
    default: [] 
  })
  captures: Capture[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

