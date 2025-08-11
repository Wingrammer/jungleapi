import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LineItem } from './line-item.entity';

export type LineItemTaxLineDocument = LineItemTaxLine & Document;

@Schema({
  timestamps: true,
  collection: 'cart_line_item_tax_line'
})
export class LineItemTaxLine {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: Number, required: true })
  rate: number;

  @Prop({ type: Number, required: true }) // ✅ Ajouté
  amount: number;

  @Prop()
  provider_id: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop()
  tax_rate_id: string;

  @Prop({ type: Types.ObjectId, ref: 'LineItem', required: true })
  item: LineItem;

  @Prop()
  deleted_at: Date;

  @Prop()
  createAt: Date;
}


export const LineItemTaxLineSchema = SchemaFactory.createForClass(LineItemTaxLine);

