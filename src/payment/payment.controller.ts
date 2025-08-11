import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CurrentStore } from 'src/store/current-store.decorator';
import { Store } from 'src/store/entities/store.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.paymentService.create(createPaymentDto);
      return payment;
    } catch (error) {
      console.error("Payment creation error:", error); // Ajoute ceci
      throw new HttpException('Error creating payment', HttpStatus.BAD_REQUEST);
    }
  }


  @Get()  
  async findAll() {
    try {
      const payments = await this.paymentService.findAll();
      return payments;
    } catch (error) {
      throw new HttpException('Error fetching payments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const payment = await this.paymentService.findOne(id);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      throw new HttpException('Error fetching payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.paymentService.update(id, updatePaymentDto);
      if (!updatedPayment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return updatedPayment;
    } catch (error) {
      throw new HttpException('Error updating payment', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedPayment = await this.paymentService.remove(id);
      if (!deletedPayment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Payment deleted successfully' };
    } catch (error) {
      throw new HttpException('Error deleting payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('me')
  getVendorPayments(@CurrentStore() store: Store) {
    return this.paymentService.findByStore(store.id);
  }
}
