import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payment } from './payment.entity';
import { RefundReason } from './refund-reason.entity';

export type RefundDocument = Refund & Document;

@Schema({ timestamps: true })
export class Refund {
  @Prop({ type: MongooseSchema.Types.Decimal128, required: true }) // amount
  amount: number;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Payment', 
    required: true 
  }) // belongsTo Payment
  payment: Payment;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'RefundReason',
    default: null 
  }) // belongsTo RefundReason (nullable)
  refund_reason?: RefundReason | null;

  @Prop({ type: String, default: null }) // note
  note?: string | null;

  @Prop({ type: String, default: null }) // created_by
  created_by?: string | null;

  @Prop({ type: Object, default: null }) // metadata
  metadata?: Record<string, any> | null;
}

export const RefundSchema = SchemaFactory.createForClass(Refund);

