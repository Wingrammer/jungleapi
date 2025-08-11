import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LineItem } from './line-item.entity';

export type LineItemAdjustmentDocument = LineItemAdjustment & Document;

@Schema({
  timestamps: true,
  collection: 'cart_line_item_adjustment' // Matching original tableName
})
export class LineItemAdjustment {
  @Prop({ required: true, unique: true })
  id: string; // Will be prefixed with "caliadj"

  @Prop()
  description: string;

  @Prop()
  code: string;

  @Prop({ type: Number, required: true, min: 0 }) // Enforces amount >= 0
  amount: number; // bigNumber() becomes Number

  @Prop()
  provider_id: string;

  @Prop()
  promotion_id: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'LineItem', required: true })
  item: LineItem;

  @Prop()
  deleted_at: Date;
}

export const LineItemAdjustmentSchema = SchemaFactory.createForClass(LineItemAdjustment);

