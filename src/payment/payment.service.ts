import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

import { Payment, PaymentDocument } from './entities/payment.entity';
import { PaymentCollection, PaymentCollectionDocument } from './entities/payment-collection.entity';
import { PaymentSession, PaymentSessionDocument } from './entities/payment-session.entity';
import { Refund, RefundDocument } from './entities/refund.entity';
import { Capture, CaptureDocument } from './entities/capture.entity';
import { Order, OrderDocument } from 'src/order/entities/CommandePrincipale/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(PaymentCollection.name) private paymentCollectionModel: Model<PaymentCollectionDocument>,
    @InjectModel(PaymentSession.name) private paymentSessionModel: Model<PaymentSessionDocument>,
    @InjectModel(Refund.name) private refundModel: Model<RefundDocument>,
    @InjectModel(Capture.name) private captureModel: Model<CaptureDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,

  ) {}



  async createPaymentForOrder(orderId: string, amount: number, provider: string): Promise<Payment> {
  const session = await this.paymentSessionModel.create({
    provider,
    status: 'pending',
  });

  const collection = await this.paymentCollectionModel.create({
    payments: [],
  });

  const payment = await this.paymentModel.create({
    order_id: orderId,
    amount,
    provider,
    status: 'pending',
    session: session._id,
    collection: collection._id,
  });

  // Mise à jour collection
  collection.payments.push(payment.id);
  await collection.save();

  return payment;
 }


  async create(dto: CreatePaymentDto): Promise<PaymentDocument> {
    const payment = new this.paymentModel(dto);
    return await payment.save(); // ici, tu reçois bien un document complet avec _id, etc.
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel
      .find()
      .populate('payment_collection')
      .populate('payment_session')
      .populate('refunds')
      .populate('captures')
      .exec();
  }

 private validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }
  }

  /** Récupérer un paiement avec toutes ses relations */
  async findOne(id: string): Promise<Payment> {
    this.validateObjectId(id);

    const payment = await this.paymentModel
      .findById(id)
      .populate('payment_collection')
      .populate('payment_session')
      .populate('refunds')
      .populate('captures')
      .exec();

    if (!payment) {
      throw new NotFoundException(`Paiement avec l'ID ${id} non trouvé`);
    }

    return payment;
  }

  /** Mettre à jour un paiement */
  async update(id: string, updateDto: Partial<CreatePaymentDto>): Promise<Payment> {
    this.validateObjectId(id);

    const updated = await this.paymentModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Paiement avec l'ID ${id} non trouvé`);
    }

    return updated;
  }

  /** Supprimer un paiement */
  async remove(id: string): Promise<Payment> {
    this.validateObjectId(id);

    const deleted = await this.paymentModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Paiement avec l'ID ${id} non trouvé`);
    }

    return deleted;
  }

  async createPayment(data: Partial<Payment>): Promise<Payment> {
    const created = new this.paymentModel(data);
    return created.save();
  }

  async createPaymentCollection(data: Partial<PaymentCollection>): Promise<PaymentCollection> {
    const created = new this.paymentCollectionModel(data);
    return created.save();
  }

  async createPaymentSession(data: Partial<PaymentSession>): Promise<PaymentSession> {
    const created = new this.paymentSessionModel(data);
    return created.save();
  }


  async capturePayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(paymentId);
    if (!payment) throw new NotFoundException('Paiement introuvable');

    // Exemple logique
    const capture = new this.captureModel({
      payment: payment._id,
      amount: payment.amount,
      created_at: new Date(),
    });
    await capture.save();

    payment.status = 'captured';
    return payment.save();
  }

  async refundPayment(paymentId: string, amount: number): Promise<Refund> {
    const payment = await this.paymentModel.findById(paymentId);
    if (!payment) throw new NotFoundException('Paiement introuvable');

    const refund = new this.refundModel({
      payment: payment._id,
      amount,
      created_at: new Date(),
    });

    payment.status = 'refunded';
    await payment.save();

    return refund.save();
  }

  async getAllPayments(): Promise<Payment[]> {
  return this.paymentModel.find().exec();
 }
 

 async findByStore(storeId: string) {
  return this.paymentModel.find({
    where: { store: { id: storeId } },
    relations: ['order'],
  });
}




}
