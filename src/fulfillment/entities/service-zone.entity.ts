import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FulfillmentSet } from './fulfillment-set.entity';
import { GeoZone } from './geo-zone.entity';
import { ShippingOption } from './shipping-option.entity';

export type ServiceZoneDocument = ServiceZone & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class ServiceZone {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => `serzo_${new Types.ObjectId().toString()}`,
  })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ 
    type: Types.ObjectId, 
    ref: 'FulfillmentSet',
    required: true
  })
  fulfillment_set: Types.ObjectId | FulfillmentSet;

  @Prop({ type: [Types.ObjectId], ref: 'GeoZone', default: [] })
  geo_zones: Types.ObjectId[] | GeoZone[];

  @Prop({ type: [Types.ObjectId], ref: 'ShippingOption', default: [] })
  shipping_options: Types.ObjectId[] | ShippingOption[];

  @Prop({ type: Object, default: null })
  metadata: Record<string, unknown> | null;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;

  // Virtuals for populated relationships
  public fulfillment_set_details?: FulfillmentSet;
  public geo_zones_details?: GeoZone[];
  public shipping_options_details?: ShippingOption[];
}

export const ServiceZoneSchema = SchemaFactory.createForClass(ServiceZone);

