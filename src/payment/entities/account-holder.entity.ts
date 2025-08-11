import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'account_holders' })
export class AccountHolder extends Document {
  @Prop({ type: String, required: true })
  provider_id: string;

  @Prop({ type: String, required: true })
  external_id: string;

  @Prop({ type: String, default: null })
  email: string | null;

  @Prop({ type: Object, default: {} })
  data: Record<string, any>;

  @Prop({ type: Object, default: null })
  metadata: Record<string, any> | null;
}

export const AccountHolderSchema = SchemaFactory.createForClass(AccountHolder);

