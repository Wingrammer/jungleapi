// return-item.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderLineItem } from './line-item.entity';
import { Return } from './Retours&Réclamations/return.entity';
import { ReturnReason } from './Retours&Réclamations/return-reason.entity';

export type ReturnItemDocument = ReturnItem & Document;

@Schema({
  timestamps: true,
  collection: 'return_items',
  toJSON: {
    virtuals: true,
transform: (
  doc,
  ret: { _id?: any; __v?: number; id?: string }
) => {
  ret.id = `ordsum_${doc._id.toString()}`;
  delete ret._id;
  delete ret.__v;
  return ret;
}

  },
})
export class ReturnItem {
  @Prop({ type: String, required: true }) // bigNumber as string
  quantity: string;

  @Prop({ type: String, default: '0' }) // bigNumber as string
  received_quantity: string;

  @Prop({ type: String, default: '0' }) // bigNumber as string
  damaged_quantity: string;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;

  @Prop({
    type: Types.ObjectId,
    ref: 'ReturnReason',
  })
  reason?: Types.ObjectId | ReturnReason;

  @Prop({
    type: Types.ObjectId,
    ref: 'Return',
    required: true,
  })
  return: Types.ObjectId | Return;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderLineItem',
    required: true,
  })
  item: Types.ObjectId | OrderLineItem;

  @Prop({ type: Date })
  deleted_at?: Date;
}

export const ReturnItemSchema = SchemaFactory.createForClass(ReturnItem);

