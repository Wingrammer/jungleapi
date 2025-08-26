import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

import { ApplicationMethod } from './entities/application-method.entity';
import { CampaignBudget } from './entities/campaign-budger.entity';
import { Campaign } from './entities/campaign.entity';
import { PromotionRule } from './entities/promotion-rule.entity';
import { PromotionRuleValue } from './entities/promotion-rule-value.entity';
import { Promotion } from './entities/promotion.entity';
import { Product } from 'src/product/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { PromotionStatus } from './enum-promotion';
import { Cron } from '@nestjs/schedule';
import { Region } from 'src/region/entities/region.entity';
import { MoneyAmount, MoneyAmountDocument } from 'src/pricing/entities/money-amount.entity';

@Injectable()
export class PromotionService {

  constructor(
    @InjectModel(ApplicationMethod.name) private readonly applicationMethodModel: Model<ApplicationMethod>,
    @InjectModel(CampaignBudget.name) private readonly campaignBudgetModel: Model<CampaignBudget>,
    @InjectModel(Campaign.name) private readonly campaignModel: Model<Campaign>,
    @InjectModel(PromotionRule.name) private readonly promotionRuleModel: Model<PromotionRule>,
    @InjectModel(PromotionRuleValue.name) private readonly promotionRuleValueModel: Model<PromotionRuleValue>,
    @InjectModel(Promotion.name) private readonly promotionModel: Model<Promotion>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(MoneyAmount.name) private readonly moneyAmountModel: Model<MoneyAmountDocument>,

  ) {}



  async findAllByUser(storeId: string) {
  return this.promotionModel.find({ store: storeId }); // ou selon ta logique
}


  async findAllByVendor(vendorId: string) {
  return this.promotionModel.find({ vendorId }).exec();
  }



    /**IMPORTANT
     * EST CE QUE LA PROMTION EST ELIGIBLE ? , changement automatiser du statu stout les 1h
     */


/**
 * 
 * @param promo 
 * @param cart 
 * @returns 
 */



private determineStatus(promotion: Promotion): PromotionStatus {
  const now = new Date();

  if (promotion.start_date && promotion.start_date > now) {
    return PromotionStatus.DRAFT;
  }

  if (promotion.end_date && promotion.end_date < now) {
    return PromotionStatus.EXPIRED;
  }

  if (!promotion.is_active) {
    return PromotionStatus.DELETED;
  }

  return PromotionStatus.ACTIVE;
}

async findAll(storeId: string): Promise<Promotion[]> {
  const promos = await this.promotionModel.find({ storeId }).exec();
  return promos.map(promo => ({
    ...promo.toObject(),
    status: this.determineStatus(promo),
  }));
}




 @Cron('*/60 * * * *') // toutes les 60 minutes
 async updateAllStatuses() {
  const promotions = await this.promotionModel.find();

  for (const promo of promotions) {
    const newStatus = this.determineStatus(promo);
    if (promo.status !== newStatus) {
      promo.status = newStatus;
      await promo.save();
    }
  }

 }

  async calculatePromotionDiscount(promo: Promotion, cart: Cart): Promise<number> {
  let totalDiscount = 0;

  for (const item of cart.items) {
    const variantId = typeof item.product_variant === 'object' && '_id' in item.product_variant
      ? item.product_variant._id
      : item.product_variant;

    const moneyAmount = await this.moneyAmountModel.findOne({
      variant: variantId,
      currency_code: cart.currency_code,
      deleted_at: null,
    });

    if (!moneyAmount) continue;

    const itemTotal = moneyAmount.amount * item.quantity;

    // Extraire productId depuis product_variant
    let productId: string | null = null;

    if (typeof item.product_variant === 'object' && 'product' in item.product_variant) {
      productId = item.product_variant.product?.toString() ?? null;
    }

    const isTargeted =
      !promo.products?.length ||
      (productId && promo.products.map(p => p.toString()).includes(productId));

    if (isTargeted) {
      if (promo.discount_type === 'percentage') {
        totalDiscount += (promo.value / 100) * itemTotal;
      } else if (promo.discount_type === 'fixed') {
        totalDiscount += promo.value;
      }
    }
  }

  return totalDiscount;
}



  async findOne(id: string): Promise<Promotion> {
    const promo = await this.promotionModel.findById(id);
    if (!promo || promo.deleted) throw new NotFoundException('Promotion introuvable');
    return promo;
  }

  async create(dto: CreatePromotionDto): Promise<Promotion> {
    return this.promotionModel.create(dto);
  }

  async update(id: string, dto: UpdatePromotionDto): Promise<Promotion> {
    const promo = await this.promotionModel.findByIdAndUpdate(id, dto, { new: true });
    if (!promo) throw new NotFoundException('Promotion introuvable');
    return promo;
  }

  async remove(id: string): Promise<Promotion> {
    const promo = await this.promotionModel.findById(id);
    if (!promo) throw new NotFoundException('Promotion introuvable');

    promo.deleted = true;
    return promo.save();
  }

  async softDelete(id: string) {
  const promotion = await this.promotionModel.findById(id);
  if (!promotion) {
    throw new NotFoundException('Promotion non trouvée');
  }

  promotion.status =  PromotionStatus.DELETED;
  await promotion.save();

  return { message: 'Promotion supprimée (soft delete)' };
}




  

}