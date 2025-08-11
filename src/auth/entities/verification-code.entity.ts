// src/auth/schemas/verification-code.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class VerificationCode extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ default: Date.now, expires: 300 }) // expire en 5 min
  createdAt: Date;
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode);
