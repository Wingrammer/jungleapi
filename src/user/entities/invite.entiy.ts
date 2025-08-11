import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'invites',
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Invite extends Document {
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ default: false })
  accepted: boolean;

  @Prop({ required: true, index: true })
  token: string;

  @Prop({ type: Date, required: true })
  expires_at: Date;

  @Prop({ type: Object, default: null })
  metadata?: Record<string, unknown>;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);


