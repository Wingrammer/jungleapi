import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fulfillment } from './fulfillment.entity';

export type FulfillmentLabelDocument = FulfillmentLabel & Document;

@Schema({
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  toJSON: { virtuals: true }, // Active les virtuals lors de la sérialisation JSON
  toObject: { virtuals: true }, // Active les virtuals lors de la conversion en objet
})
export class FulfillmentLabel {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `fulla_${new Types.ObjectId().toString()}`,
  })
  id: string;

  @Prop({ type: String, required: true })
  tracking_number: string;

  @Prop({ type: String, required: true })
  tracking_url: string;

  @Prop({ type: String, required: true })
  label_url: string;

  @Prop({ type: Types.ObjectId, ref: 'Fulfillment', required: true })
  fulfillment: Types.ObjectId;

  // Virtual pour la population
  public fulfillment_details?: Fulfillment;
}

export const FulfillmentLabelSchema = SchemaFactory.createForClass(FulfillmentLabel);

