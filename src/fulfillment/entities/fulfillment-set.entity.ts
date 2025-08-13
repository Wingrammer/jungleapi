import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ServiceZone } from './service-zone.entity';

export type FulfillmentSetDocument = FulfillmentSet & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: {
    virtuals: true,
    transform: function(doc, ret:{ _id?: any; __v?: number; id?: string; password?: string; }) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class FulfillmentSet {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `fuset_${new Types.ObjectId().toString()}`,
  })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: [Types.ObjectId], ref: 'ServiceZone', default: [] })
  service_zones: Types.ObjectId[] | ServiceZone[];

  @Prop({ type: Object, default: null })
  metadata: Record<string, any> | null;

  // Virtual pour la population
  public service_zones_details?: ServiceZone[];

  // Champ pour soft delete
  @Prop({ type: Date, default: null })
  deleted_at: Date | null;
}

export const FulfillmentSetSchema = SchemaFactory.createForClass(FulfillmentSet);

