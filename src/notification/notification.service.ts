import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDocument } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(userId: string, message: string, type: string = 'new_store') {
    const notification = new this.notificationModel({ userId, message, type });
    return notification.save();
  }

  async findUnread(userId: string) {
    return this.notificationModel.find({ userId, read: false }).sort({ createdAt: -1 }).exec();
  }

  async markAsRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(id, { read: true }, { new: true }).exec();
  }

  async createForUser(userId: string, message: string) {
    const notification = await this.notificationModel.create({
      user: userId,
      message,
      read: false,
      createdAt: new Date(),
    });
    return notification;
  }
}
