import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

export type NotificationType = 'new_store' | 'other';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  userId: string; // destinataire de la notification (admin)

  @Prop({ required: true })
  message: string;

  @Prop({ type: String, default: 'new_store' })
  type: NotificationType;

  @Prop({ default: false })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
