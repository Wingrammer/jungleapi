import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payment } from './payment.entity';

export type CaptureDocument = Capture & Document;

@Schema({ timestamps: true }) // Optional: Adds createdAt and updatedAt
export class Capture {
  @Prop({ type: MongooseSchema.Types.Decimal128, required: true }) // For bigNumber (Decimal128 handles large numbers)
  amount: number;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Payment', 
    required: true 
  })
  payment: Payment; // BelongsTo relationship

  @Prop({ type: Object, default: null }) // JSON metadata
  metadata?: Record<string, any> | null;

  @Prop({ type: String, default: null }) // created_by
  created_by?: string | null;
}

export const CaptureSchema = SchemaFactory.createForClass(Capture);

