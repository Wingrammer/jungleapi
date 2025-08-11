import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payment } from './payment.entity';
import { PaymentProvider } from './payment-provider.entity';
import { PaymentSession } from './payment-session.entity';

export enum PaymentCollectionStatus {
  NOT_PAID = 'not_paid',
  AWAITING = 'awaiting',
  AUTHORIZED = 'authorized',
  PARTIALLY_CAPTURED = 'partially_captured',
  CAPTURED = 'captured',
  PARTIALLY_REFUNDED = 'partially_refunded',
  REFUNDED = 'refunded',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

export type PaymentCollectionDocument = PaymentCollection & Document;

@Schema({ timestamps: true })
export class PaymentCollection {
  @Prop({ type: String, required: true }) // currency_code (e.g., "USD")
  currency_code: string;

  @Prop({ type: MongooseSchema.Types.Decimal128, required: true }) // amount
  amount: number;

  @Prop({ type: MongooseSchema.Types.Decimal128, default: null }) // authorized_amount
  authorized_amount?: number | null;

  @Prop({ type: MongooseSchema.Types.Decimal128, default: null }) // captured_amount
  captured_amount?: number | null;

  @Prop({ type: MongooseSchema.Types.Decimal128, default: null }) // refunded_amount
  refunded_amount?: number | null;

  @Prop({ type: Date, default: null }) // completed_at
  completed_at?: Date | null;

  @Prop({
    type: String,
    enum: Object.values(PaymentCollectionStatus),
    default: PaymentCollectionStatus.NOT_PAID,
  })
  status: PaymentCollectionStatus;

  @Prop({ type: Object, default: null }) // metadata
  metadata?: Record<string, any> | null;

  // Many-to-Many with PaymentProvider
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PaymentProvider' }],
    default: [],
  })
  payment_providers: PaymentProvider[];

  // One-to-Many with PaymentSession
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PaymentSession' }],
    default: [],
  })
  payment_sessions: PaymentSession[];

  // One-to-Many with Payment
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Payment' }],
    default: [],
  })
  payments: Payment[];
}

export const PaymentCollectionSchema =
  SchemaFactory.createForClass(PaymentCollection);
