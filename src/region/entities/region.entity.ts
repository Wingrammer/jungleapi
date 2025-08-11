import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Country } from './country.entity';

export type RegionDocument = Region & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Region {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, index: true })
  currency_code: string;

  @Prop({ default: true })
  automatic_taxes: boolean;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Country' }],
  })
  countries?: Country[];

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;
}

export const RegionSchema = SchemaFactory.createForClass(Region);

