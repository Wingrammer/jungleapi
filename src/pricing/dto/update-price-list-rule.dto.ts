import { IsOptional, IsString, IsMongoId } from 'class-validator';

export class UpdatePriceListRuleDto {
  @IsOptional()
  @IsString()
  attribute?: string;

  @IsOptional()
  value?: any;

  @IsOptional()
  @IsMongoId()
  price_list?: string;
}
