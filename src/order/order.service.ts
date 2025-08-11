import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Order, OrderDocument } from './entities/CommandePrincipale/order.entity';
import { OrderTransaction, OrderTransactionDocument } from './entities/Transaction/transaction.entity';
import { CreateOrderChangeActionDTO } from './dto/create-order-change-action.dto';
import { PaymentService } from 'src/payment/payment.service';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { OrderStatus } from './order-status.enum';
import { OrderItem, OrderItemDocument } from './entities/CommandePrincipale/order-item.entity';
import { OrderLineItemAdjustment } from './entities/Taxes&Adjustments/line-item-adjustment.entity';
import { OrderLineItemTaxLine } from './entities/Taxes&Adjustments/line-item-tax-line.entity';
import { OrderCreditLine } from './entities/Transaction/credit-line.entity';
import { OrderAddress } from './entities/CommandePrincipale/address.entity';
import { Store, StoreDocument } from 'src/store/entities/store.entity';
import { CreateReturnDto } from './dto/create-return.dto';
import { Return } from './entities/Retours&Réclamations/return.entity';
import { Payment, PaymentDocument } from 'src/payment/entities/payment.entity';
import { OrderShippingMethodTaxLine } from './entities/Taxes&Adjustments/order-shipping-method-tax-line.entity';
import { OrderShippingMethod } from './entities/Taxes&Adjustments/order-shipping-method.entity';
import { OrderShippingMethodAdjustment } from './entities/Taxes&Adjustments/order-shipping-method-adjustment.entity';
import { Cart } from 'src/cart/entities/cart.entity';

export interface OrderChangeAction {
  id: string;
  order_id: string;
  order_change_id: string;
  action: string;
  created_at: string;
}

@Injectable()
export class OrderService {
  constructor(
  @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>,
  @InjectModel(OrderShippingMethod.name) private shippingMethodModel: Model<OrderShippingMethod>,
  @InjectModel(OrderLineItemAdjustment.name) private lineItemAdjustmentModel: Model<OrderLineItemAdjustment>,
  @InjectModel(OrderShippingMethodAdjustment.name) private shippingMethodAdjustmentModel: Model<OrderShippingMethodAdjustment>,
  @InjectModel(OrderLineItemTaxLine.name) private lineItemTaxLineModel: Model<OrderLineItemTaxLine>,
  @InjectModel(OrderShippingMethodTaxLine.name) private shippingMethodTaxLineModel: Model<OrderShippingMethodTaxLine>,
  @InjectModel(OrderCreditLine.name) private creditLineModel: Model<OrderCreditLine>,
  @InjectModel(OrderTransaction.name) private transactionModel: Model<OrderTransactionDocument>,
  @InjectModel(OrderAddress.name) private addressModel: Model<OrderAddress>,
  @InjectModel(Cart.name) private cartModel: Model<Cart>,
  @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  @InjectModel(Return.name) private returnModel: Model<Return>,
  @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,

  private readonly paymentService: PaymentService, 
  ) {}

  private orderChangeActions: OrderChangeAction[] = [];

  async addOrderAction(
    data: CreateOrderChangeActionDTO | CreateOrderChangeActionDTO[],
  ): Promise<OrderChangeAction | OrderChangeAction[]> {
    const actions = Array.isArray(data) ? data : [data];

    const createdActions = actions.map(action => {
      const newAction: OrderChangeAction = {
        id: crypto.randomUUID(),
        ...action,
        created_at: new Date().toISOString(),
      };
      this.orderChangeActions.push(newAction);
      return newAction;
    });

    return Array.isArray(data) ? createdActions : createdActions[0];
  }


  async findOneWithDetails(orderId: string) {
  return this.orderModel.findById(orderId)
    .populate('customer')
    .populate('payments')
    .populate('fulfillments')
    .populate('shipping_methods')
    .populate('summaries')
    .populate('items')
    .exec();
}


 async getAllOrders() {
    return this.orderModel.find({})
      .populate('customer')
      .populate('sales_channel')
      .populate('payments')
      .populate('fulfillments')
      .select([
        '_id',
        'createdAt',
        'customer',
        'sales_channel',
        'payments',
        'fulfillments',
        'total'
      ])
      .lean();
  }

async createReturn(body: CreateReturnDto) {
  return this.returnModel.create({
    order: body.orderId,
    items: body.items,
    refund_amount: body.amount,
    status: 'requested',
    created_by: 'admin-panel',
    requested_at: new Date(),
  });
}



  /*

  async findOrdersByVendorUserId(vendorId: string) {
    // Étape 1 : Trouver tous les stores du vendeur
    const stores = await this.storeModel.find({ user: vendorId }).select('_id').exec();
    const storeIds = stores.map(store => store._id);

    if (!storeIds.length) return [];

    // Étape 2 : Trouver les fragments liés à ces stores
    const fragments = await this.vendorFragmentModel
      .find({ store: { $in: storeIds } })
      .populate('parent_order') // pour récupérer l’email client etc.
      .populate('shipping_address')
      .exec();

    return fragments;
  }

 

  async findByStoreId(storeId: string) {
  return this.orderModel.find({
    where: { store: { id: storeId } },
    relations: ['products', 'customer'],
  });
}*/


  // Exemple d'une méthode pour créer une commande MongoDB
  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(orderData);
    return createdOrder.save();
  }

  // Exemple pour récupérer toutes les commandes
  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  // Créer un paiement lié à une commande
  // Créer un paiement lié à une commande



async createPaymentForOrder(orderId: string, createPaymentDto: CreatePaymentDto) {
  const order = await this.orderModel.findById(orderId);
  if (!order) {
    throw new NotFoundException(`Order with id ${orderId} not found`);
  }

 const payment: PaymentDocument = await this.paymentService.create(createPaymentDto);
 order.payments?.push(payment.id);

  await order.save();

  return payment;
}


  async findOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return order;
  }

  async updateOrder(orderId: string, updateData: Partial<Order>): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(orderId, updateData, { new: true })
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return updatedOrder;
  }

  async deleteOrder(orderId: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(orderId).exec();
    if (!deletedOrder) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return deletedOrder;
  }

  /**
 * ✅ Seul le vendeur peut changer le statut de la commande.
 * Ici, on suppose que le contrôle d'accès est fait par un guard ou une vérification dans le contrôleur.
 */
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    // Le vendeur change le statut
    order.status = status;
    await order.save();

    return order;
  }
/*
    static createFromDto(dto: Partial<OrderTransaction>): Partial<OrderTransaction> {
    const toNull = <T>(val: T | undefined): T | null => val === undefined ? null : val;
    const toObjectIdOrNull = (val: any): Types.ObjectId | null => {
      if (val === undefined || val === null) return null;
      return new Types.ObjectId(val);
    };

    return {
      ...dto,
      reference: toNull(dto.reference),
      reference_id: toNull(dto.reference_id),
      return: toObjectIdOrNull(dto.return),
      exchange: toObjectIdOrNull(dto.exchange),
      claim: toObjectIdOrNull(dto.claim),
    };  
  }
*/

  async createFromCart(cartId: string): Promise<Order> {
  const cart = await this.cartModel.findById(cartId)
    .populate([
      {
        path: 'items',
        populate: ['adjustments', 'tax_lines']
      },
      {
        path: 'shipping_methods',
        populate: ['adjustments', 'tax_lines']
      },
      'shipping_address',
      'billing_address',
    ])
    .exec();

  if (!cart) {
    throw new NotFoundException(`Cart with id ${cartId} not found`);
  }

  // 1. Copier les OrderItems
  const orderItems = await Promise.all(cart.items.map(async (item) => {
    const orderItem = new this.orderItemModel({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      product_id: item.product_id,
      variant_id: item.variant_id,
      adjustments: item.adjustments,
      tax_lines: item.tax_lines,
      is_giftcard: item.is_giftcard,
      is_tax_inclusive: item.is_tax_inclusive,
      metadata: item.metadata,
    });
    return await orderItem.save();
  }));

  // 2. Copier les méthodes de livraison
  const orderShippingMethods = await Promise.all(
  (cart.shipping_methods || []).map(async (method) => {
    const orderMethod = new this.shippingMethodModel({
      name: method.name,
      description: method.description ?? null,
      amount: method.amount, //  attention ici
      is_tax_inclusive: method.is_tax_inclusive ?? false,
      is_custom_amount: method.is_custom_amount ?? false,
      shipping_option_id: method.shipping_option_id ?? null,
      data: method.data ?? null,
      metadata: method.metadata ?? null,
      adjustments: method.adjustments ?? [],
      tax_lines: method.tax_lines ?? [],
    });
    return await orderMethod.save();
  })
 );


  // 3. Copier les adresses
  const shippingAddress = cart.shipping_address
    ? await new this.addressModel(cart.shipping_address).save()
    : null;

  const billingAddress = cart.billing_address
    ? await new this.addressModel(cart.billing_address).save()
    : null;

  // 4. Créer la commande
  const order = new this.orderModel({
    cart_id: cart.id,
    customer_id: cart.customer,
    currency_code: cart.currency_code,
    region_id: cart.region_id,
    sales_channel_id: cart.sales_channel_id,
    shipping_address: shippingAddress,
    billing_address: billingAddress,
    items: orderItems,
    shipping_methods: orderShippingMethods,
    subtotal: cart.subtotal,
    tax_total: cart.tax_total,
    shipping_total: cart.shipping_total,
    discount_total: cart.discount_total,
    total: cart.total,
    metadata: cart.metadata,
    status: 'pending', // ou draft selon logique
  });

  return await order.save();
}

/*
async createMultiVendorOrder(cartId: string): Promise<Order> {
  const cart = await this.cartModel.findById(cartId)
    .populate({
      path: 'items',
      populate: ['adjustments', 'tax_lines', 'product']
    })
    .populate('shipping_methods')
    .populate('billing_address')
    .populate('shipping_address')
    .exec();

  if (!cart || cart.items.length === 0) {
    throw new Error('Panier vide ou introuvable');
  }

  // Étape 1 : Créer la commande principale
  const order = new this.orderModel({
    customer_id: cart.customer,
    email: cart.email,
    shipping_address: cart.shipping_address,
    billing_address: cart.billing_address,
    cart_id: cart._id,
    status: 'pending',
  });

  await order.save();

  // Étape 2 : Créer les LineItems sans regroupement par vendeur
  let subtotal = 0;
  let taxTotal = 0;
  let shippingTotal = 0;

  for (const item of cart.items) {
    if (!item?.product) continue;

    // Calculer le sous-total pour chaque produit
    subtotal += item.unit_price * item.quantity;

    // Calcul des taxes
    if (item.tax_lines?.length) {
      for (const taxLine of item.tax_lines) {
        taxTotal += taxLine.amount || 0;
      }
    }
  }

  // Récupérer un shipping_method du panier
  const shippingMethod = cart.shipping_methods?.[0]; // Prendre le premier shipping method disponible
  if (shippingMethod) {
    shippingTotal += shippingMethod.amount || 0;
  }

  // Étape 3 : Créer une commande sans fragmentation par vendeur
  const fragment = new OrderFragmentModel({
    parent_order: order._id,
    line_items: cart.items.map(i => i.id),
    shipping_address: cart.shipping_address,
    billing_address: cart.billing_address,
    subtotal,
    shipping_total: shippingTotal,
    tax_total: taxTotal,
    total: subtotal + taxTotal + shippingTotal,
    status: 'pending',
  });

  await fragment.save();

  return order;
}
*/

// order.service.ts
async createMultiVendorOrder(cartId: string): Promise<Order> {
  const cart = await this.cartModel.findById(cartId)
    .populate('items')
    .populate('shipping_methods')
    .populate('billing_address')
    .populate('shipping_address')
    .exec();

  if (!cart || cart.items.length === 0) {
    throw new Error('Panier vide ou introuvable');
  }

  const order = new this.orderModel({
    customer_id: cart.customer,
    email: cart.email,
    shipping_address: cart.shipping_address,
    billing_address: cart.billing_address,
    cart_id: cart._id,
    status: 'pending',
  });

  return await order.save();
}

}
