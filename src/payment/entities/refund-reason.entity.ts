import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Refund } from './refund.entity';

export type RefundReasonDocument = RefundReason & Document;

@Schema({ timestamps: true })
export class RefundReason {
  @Prop({ type: String, required: true, index: true }) // label with search index
  label: string;

  @Prop({ type: String, default: null }) // description
  description?: string | null;

  @Prop({ type: Object, default: null }) // metadata
  metadata?: Record<string, any> | null;

  // One-to-Many relationship with Refund
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Refund' }],
    default: [],
  })
  refunds: Refund[];
}

export const RefundReasonSchema = SchemaFactory.createForClass(RefundReason);

