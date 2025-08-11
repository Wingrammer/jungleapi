import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Cart } from './cart.entity';

export type CreditLineDocument = CreditLine & Document;

@Schema({ timestamps: true })
export class CreditLine {
  @Prop({ required: true, unique: true })
  id: string; // Préfixe "cacl" sera géré dans le service ou middleware

  @Prop({ type: Types.ObjectId, ref: 'Cart', required: true })
  cart: Cart;

  @Prop()
  reference: string;

  @Prop()
  reference_id: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Object, required: true })
  raw_amount: Record<string, any>;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop()
  deleted_at: Date;
}

export const CreditLineSchema = SchemaFactory.createForClass(CreditLine);
