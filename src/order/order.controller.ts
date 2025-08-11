// src/order/order.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderChangeActionDTO,
} from './dto/create-order-change-action.dto';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { Order } from './entities/CommandePrincipale/order.entity';
import { RolesGuard } from 'src/auth/roles.guards';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CurrentStore } from 'src/store/current-store.decorator';
import { Store } from 'src/store/entities/store.entity';
import { CreateReturnDto } from './dto/create-return.dto';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService
    
  ) {}

  @Post('add-action')
  async addOrderAction(
    @Body() data: CreateOrderChangeActionDTO | CreateOrderChangeActionDTO[],
  ) {
    return this.orderService.addOrderAction(data);
  }

   // Nouveau endpoint pour créer un paiement lié à une commande
  @Post(':orderId/payment')
  async createPaymentForOrder(
    @Param('orderId') orderId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.orderService.createPaymentForOrder(orderId, createPaymentDto);
  }

    // Créer une commande
  @Post()
  async createOrder(@Body() orderData: Partial<Order>) {
    return this.orderService.createOrder(orderData);
  }

    // Récupérer toutes les commandes
  @Get()
  async findAllOrders() {
    return this.orderService.findAllOrders();
  }

    // Récupérer une commande par son ID
  @Get(':orderId')
  async findOrderById(@Param('orderId') orderId: string) {
    return this.orderService.findOrderById(orderId);
  }

   // Mettre à jour une commande partiellement (PATCH)
  @Patch(':orderId')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() updateData: Partial<Order>,
  ) {
    return this.orderService.updateOrder(orderId, updateData);
  }

    // Supprimer une commande
  @Delete(':orderId')
  async deleteOrder(@Param('orderId') orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }

  /**
 * Endpoint réservé au vendeur.
 * On peut protéger cet endpoint avec un Guard JWT ou un décorateur de rôle.
 */

  //@UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(id, updateOrderStatusDto.status);
  }

  // Créer une commande multi-vendeur à partir d’un panier
@Post('create-from-cart/:cartId')
async createMultiVendorOrder(@Param('cartId') cartId: string) {
  return this.orderService.createMultiVendorOrder(cartId);
}


@Get(':id')
async getAllOrders() {
  return this.orderService.getAllOrders();
}


@Post('return')
async createReturn(@Body() body: CreateReturnDto) {
  return this.orderService.createReturn(body);
}






@Get(':id')
async getOrder(@Param('id') id: string) {
  const order = await this.orderService.findOneWithDetails(id);
  if (!order) {
    throw new NotFoundException('Commande non trouvée');
  }
  return order;
}








}
