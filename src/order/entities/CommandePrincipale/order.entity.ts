import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from '../../order-status.enum';
import { Payment } from 'src/payment/entities/payment.entity';

@Schema({
  timestamps: true,
  collection: 'orders',
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
export class Order extends Document {

 
 @Prop({ type: Number, unique: true })
  display_id?: number | null;
  


  @Prop({ 
    required: true, 
    enum: OrderStatus,   // Restriction aux valeurs de l'enum OrderStatus
    default: OrderStatus.PENDING  // Par défaut, une commande est "pending"
  })
  status: OrderStatus;


  @Prop({ required: true })
  currency_code: string;

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, unknown>;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  store: Types.ObjectId;

  @Prop({ required: true })
  email: string;


  @Prop({ type: Types.ObjectId, ref: 'OrderAddress', default: null })
  shipping_address?: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'OrderAddress', default: null })
  billing_address?: Types.ObjectId | null;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderSummary' }], default: [] })
  summaries?: Types.ObjectId[]; // ou OrderSummary[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }], default: [] })
  items?: Types.ObjectId[]; // ou OrderItem[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderShippingMethod' }], default: [] })
  shipping_methods?: Types.ObjectId[]; // ou OrderShippingMethod[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Payment' }], default: [] })
  payments?:  Payment[];

  @Prop()
  deleted_at?: Date;

  @Prop({ type: Number, required: true, default: 0 })
  total: number;

}

export type OrderDocument = Order & Document;


export const OrderSchema = SchemaFactory.createForClass(Order);

