import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderLineItem } from '../line-item.entity';

@Schema({
  timestamps: true,
  collection: 'order_line_item_tax_lines',
  autoIndex: true,
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

  }
})
export class OrderLineItemTaxLine extends Document {
  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, default: null })
  tax_rate_id: string | null;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true }) // bigNumber comme string
  rate: string;

  @Prop({ type: String, default: null })
  provider_id: string | null;

  @Prop({
    type: Types.ObjectId,
    ref: 'OrderLineItem',
    required: true,
    index: true
  })
  item: Types.ObjectId | OrderLineItem;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;

  // Pas besoin de déclarer _id ou id, gérés automatiquement
}

export const OrderLineItemTaxLineSchema = SchemaFactory.createForClass(OrderLineItemTaxLine);
