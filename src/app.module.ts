import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyModule } from './api-key/api-key.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CurrencyModule } from './currency/currency.module';
import { CustomerModule } from './customer/customer.module';
import { FulfillmentModule } from './fulfillment/fulfillment.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { PricingModule } from './pricing/pricing.module';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { RegionModule } from './region/region.module';
import { SalesChannelModule } from './sales-channel/sales-channel.module';
import { StockLocationModule } from './stock-location/stock-location.module';
import { StoreModule } from './store/store.module';
import { TaxModule } from './tax/tax.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ApiKeyModule, AuthModule, CartModule, CurrencyModule, CustomerModule, FulfillmentModule, InventoryModule, OrderModule, PaymentModule, PricingModule, ProductModule, PromotionModule, RegionModule, SalesChannelModule, StockLocationModule, StoreModule, TaxModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
