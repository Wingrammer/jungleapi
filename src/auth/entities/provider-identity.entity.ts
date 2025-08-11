import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AuthIdentity } from './auth-identity.entity';

export type ProviderIdentityDocument = ProviderIdentity & Document;

@Schema()
export class ProviderIdentity {
  
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  entity_id: string; 

  @Prop({ required: true })
  provider: string; 

  @Prop({ type: Object })
  user_metadata?: Record<string, any>; 

  @Prop({ type: Types.ObjectId, ref: 'AuthIdentity' })
  auth_identity: AuthIdentity | Types.ObjectId;
}

export const ProviderIdentitySchema = SchemaFactory.createForClass(ProviderIdentity);