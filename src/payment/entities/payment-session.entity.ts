import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PaymentCollection } from './payment-collection.entity';
import { Payment } from './payment.entity';

export enum PaymentSessionStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  REQUIRES_MORE = 'requires_more',
  ERROR = 'error',
  CANCELED = 'canceled',
}

export type PaymentSessionDocument = PaymentSession & Document;

@Schema({ timestamps: true })
export class PaymentSession {
  @Prop({ type: String, required: true }) // currency_code (e.g., "USD")
  currency_code: string;

  @Prop({ type: MongooseSchema.Types.Decimal128, required: true }) // amount
  amount: number;

  @Prop({ type: String, required: true }) // provider_id
  provider_id: string;

  @Prop({ type: Object, default: {} }) // data
  data: Record<string, any>;

  @Prop({ type: Object, default: null }) // context
  context?: Record<string, any> | null;

  @Prop({
    type: String,
    enum: Object.values(PaymentSessionStatus),
    default: PaymentSessionStatus.PENDING,
  })
  status: PaymentSessionStatus;

  @Prop({ type: Date, default: null }) // authorized_at
  authorized_at?: Date | null;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PaymentCollection',
    required: true,
  }) // belongsTo PaymentCollection
  payment_collection: PaymentCollection;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Payment',
    default: null,
  }) // hasOne Payment (nullable)
  payment?: Payment | null;

  @Prop({ type: Object, default: null }) // metadata
  metadata?: Record<string, any> | null;
}

export const PaymentSessionSchema = SchemaFactory.createForClass(PaymentSession);
