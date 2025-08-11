import { IsOptional, IsMongoId } from 'class-validator';

export class UpdatePriceListDto {
  @IsOptional()
  @IsMongoId({ each: true })
  prices?: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  price_list_rules?: string[];
}
