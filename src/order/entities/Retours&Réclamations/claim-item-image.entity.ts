import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OrderClaimItem } from './claim-item.entity';

type OrderClaimItemImageDocument = HydratedDocument<OrderClaimItemImage>;

@Schema({
  timestamps: true,
  collection: 'order_claim_item_images',
  autoIndex: true,
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
  id: false // Désactive le virtual getter 'id' par défaut de Mongoose
})
export class OrderClaimItemImage {
  @Prop({
    type: Types.ObjectId,
    ref: 'OrderClaimItem',
    required: true,
    index: true
  })
  claim_item: Types.ObjectId;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: Object, required: false })
  metadata?: Record<string, any>;

  @Prop({ type: Date, required: false, index: true })
  deleted_at?: Date;

  // Déclaration explicite pour TypeScript
  _id: Types.ObjectId;
  id: string;
}

export const OrderClaimItemImageSchema = SchemaFactory.createForClass(OrderClaimItemImage);

