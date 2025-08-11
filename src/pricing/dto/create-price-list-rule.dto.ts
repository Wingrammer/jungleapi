import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreatePriceListRuleDto {
  @IsString()
  attribute: string;

  @IsOptional()
  value?: any;

  @IsMongoId()
  price_list: string;
}
