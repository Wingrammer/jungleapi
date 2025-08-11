// return-reason.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReturnReasonDocument = ReturnReason & Document;

@Schema({
  timestamps: true,
  collection: 'return_reasons',
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
})
export class ReturnReason {
  @Prop({ type: String, required: true, index: true, text: true })
  value: string;

  @Prop({ type: String, required: true, index: true, text: true })
  label: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;

  @Prop({
    type: Types.ObjectId,
    ref: 'ReturnReason',
  })
  parent_return_reason?: Types.ObjectId | ReturnReason;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'ReturnReason' }],
    default: [],
  })
  return_reason_children: Types.ObjectId[] | ReturnReason[];

  @Prop({ type: Date })
  deleted_at?: Date;
}

export const ReturnReasonSchema = SchemaFactory.createForClass(ReturnReason);

