import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PromotionStatus } from '../enum-promotion';
import { IsEnum, IsIn } from 'class-validator';
import { PromotionType } from '../promotion-type.enum';


export type PromotionDocument = Promotion & Document;

@Schema({ timestamps: true })
export class Promotion {
  @Prop({ required: true, unique: true })
  code: string; // Ex: SUMMER2025

  @Prop({ required: true, enum: ['percentage', 'fixed'] })
  discount_type: 'percentage' | 'fixed';

  @Prop({ required: true, min: 0 })
  value: number; // Ex: 10 (10% ou 10€)

  @Prop({ type: Number, default: 0 })
  min_cart_total?: number; // Montant min du panier pour être éligible

  @Prop({ type: String, enum: PromotionStatus, default: PromotionStatus.DRAFT })
  status: PromotionStatus;

  @Prop({ type: Date })
  start_date?: Date;

  @Prop({ type: Date })
  end_date?: Date;

  @Prop({type: Boolean})
  is_active: Boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  products: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductCollection' }], default: [] })
  collections: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductCategory' }], default: [] })
  categories: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CustomerGroup' }], default: [] })
  customerGroups: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Region' }], default: [] })
  regions: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  applies_to_shipping: boolean;

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;

  
  @IsEnum(PromotionType)
  type: PromotionType;

  @Prop({ default: false })
  deleted: boolean;

}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
