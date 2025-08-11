import { IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  title?: string;

  @IsString()
  currency_code: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  min_quantity?: number;

  @IsOptional()
  @IsNumber()
  max_quantity?: number;

  @IsMongoId()
  price_set: string;

  @IsOptional()
  @IsMongoId({ each: true })
  price_rules?: string[];

  @IsMongoId()
  store_id: string;

  @IsOptional()
  @IsMongoId()
  price_list?: string;

  @IsOptional()
  @IsMongoId()
  region?: string;

  @IsOptional()
  @IsMongoId()
  country?: string;

  @IsOptional()
  @IsMongoId()
  product_variant?: string;

  @IsString()
  phone: string; 
}
