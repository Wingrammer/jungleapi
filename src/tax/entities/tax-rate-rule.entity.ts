import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TaxRate } from './tax-rate.entity';

@Schema({
  timestamps: true,
  collection: 'tax_rate_rules',
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
})
export class TaxRateRule extends Document {
  @Prop({ type: Object, default: null })
  metadata?: Record<string, unknown>;

  @Prop({ type: String, default: null })
  created_by?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'TaxRate',
    required: true,
  })
  tax_rate: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  reference: string;

  @Prop({ required: true, index: true })
  reference_id: string;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;
}

export const TaxRateRuleSchema = SchemaFactory.createForClass(TaxRateRule);


TaxRateRuleSchema.index(
  { tax_rate: 1, reference_id: 1 },
  {
    name: 'IDX_tax_rate_rule_unique_rate_reference',
    unique: true,
    partialFilterExpression: { deleted_at: { $eq: null } },
  },
);


TaxRateRuleSchema.index(
  { reference_id: 1 },
  {
    name: 'IDX_tax_rate_rule_reference_id',
    partialFilterExpression: { deleted_at: { $eq: null } },
  },
);
