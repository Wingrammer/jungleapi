import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({

    imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // clé secrète
      signOptions: { expiresIn: '1d' }, // expiration du token
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
