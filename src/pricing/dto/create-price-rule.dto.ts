import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PricingRuleOperator } from '../entities/price-rule.entity';

export class CreatePriceRuleDto {
  @IsString()
  attribute: string;

  @IsString()
  value: string;

  @IsEnum(PricingRuleOperator)
  operator: PricingRuleOperator;

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsMongoId()
  price: string;
}
