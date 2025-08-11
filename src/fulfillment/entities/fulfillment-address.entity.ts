import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fulfillment } from './fulfillment.entity';

export type FulfillmentAddressDocument = FulfillmentAddress & Document;

@Schema({
  timestamps: false, // Désactive les timestamps automatiques
  _id: false,       // Utilise 'id' comme clé primaire
})
export class FulfillmentAddress {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `fuladdr_${Math.random().toString(36).substring(2, 11)}`
  })
  id: string; // Clé primaire avec préfixe "fuladdr"

  @Prop({ type: String })
  company?: string;

  @Prop({ type: String })
  first_name?: string;

  @Prop({ type: String })
  last_name?: string;

  @Prop({ type: String })
  address_1?: string;

  @Prop({ type: String })
  address_2?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  country_code?: string;

  @Prop({ type: String })
  province?: string;

  @Prop({ type: String })
  postal_code?: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop({
  type: Types.ObjectId,
  ref: 'Fulfillment',
  required: true
  })
  fulfillment: Types.ObjectId | Fulfillment;

}

export const FulfillmentAddressSchema = SchemaFactory.createForClass(FulfillmentAddress);