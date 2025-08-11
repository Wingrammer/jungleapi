import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './entities/address.entity';
import { Model } from 'mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { CreditLine, CreditLineSchema } from './entities/credit-line.entity';
import { LineItem, LineItemSchema } from './entities/line-item.entity';
import { LineItemTaxLine, LineItemTaxLineSchema } from './entities/line-item-tax-line.entity';
import { LineItemAdjustment, LineItemAdjustmentSchema } from './entities/line-item-adjustment.entity';
import { ShippingMethod, ShippingMethodSchema } from './entities/shipping-method.entity';
import { ShippingMethodTaxLine, ShippingMethodTaxLineSchema } from './entities/shipping-method-tax-line.entity';
import { ShippingMethodAdjustment, ShippingMethodAdjustmentSchema } from './entities/shipping-method-adjustment.entity';
import { Order, OrderSchema } from 'src/order/entities/CommandePrincipale/order.entity';
import { Promotion ,PromotionSchema} from 'src/promotion/entities/promotion.entity';

@Module({
  imports: [
        MongooseModule.forFeature([
          {name: Address.name, schema: AddressSchema },
          {name: Cart.name, schema: CartSchema },
          {name: CreditLine.name, schema: CreditLineSchema },
          {name: LineItem.name, schema: LineItemSchema },
          {name: LineItemTaxLine.name, schema: LineItemTaxLineSchema },
          {name: LineItemAdjustment.name, schema: LineItemAdjustmentSchema },
          {name: ShippingMethod.name, schema: ShippingMethodSchema },
          {name: ShippingMethodTaxLine.name, schema: ShippingMethodTaxLineSchema },
          {name: ShippingMethodAdjustment.name, schema: ShippingMethodAdjustmentSchema },
          { name: Order.name, schema: OrderSchema },
          { name: Promotion.name, schema: PromotionSchema }
        ]),
      
  ],
  

  
  controllers: [
    CartController
  ],
  providers: [
    CartService
  ],
  exports: [
    CartService,MongooseModule
    
  ]
})
export class CartModule {}
