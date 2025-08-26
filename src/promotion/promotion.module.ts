import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';

import { ApplicationMethod, ApplicationMethodSchema } from './entities/application-method.entity';
import { CampaignBudget, CampaignBudgetSchema } from './entities/campaign-budger.entity';
import { Campaign, CampaignSchema } from './entities/campaign.entity';
import { PromotionRule, PromotionRuleSchema } from './entities/promotion-rule.entity';
import { PromotionRuleValue, PromotionRuleValueSchema } from './entities/promotion-rule-value.entity';
import { Promotion, PromotionSchema } from './entities/promotion.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { CustomerGroup, CustomerGroupSchema } from 'src/customer/entities/customer-group.entity';
import { MoneyAmount, MoneyAmountSchema } from 'src/pricing/entities/money-amount.entity';
import { StoreModule } from 'src/store/store.module';
import { StoreGuard } from 'src/auth/StoreAuthGuard';

@Module({
  imports: [
     StoreModule,
    MongooseModule.forFeature([
      { name: ApplicationMethod.name, schema: ApplicationMethodSchema },
      { name: CampaignBudget.name, schema: CampaignBudgetSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: PromotionRule.name, schema: PromotionRuleSchema },
      { name: PromotionRuleValue.name, schema: PromotionRuleValueSchema },
      { name: Promotion.name, schema: PromotionSchema },
      { name: Product.name, schema: ProductSchema },
      { name: CustomerGroup.name, schema: CustomerGroupSchema },
      { name: MoneyAmount.name, schema: MoneyAmountSchema },

    ]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService, StoreGuard],
})
export class PromotionModule {}

/*la conception complète et logique des promotions pour un système e-commerce multivendeur*/