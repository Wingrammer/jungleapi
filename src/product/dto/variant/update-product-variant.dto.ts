import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductVariantDto {
  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  product_id?: string;

  @IsOptional()
  @IsString({ each: true })
  option_value_ids?: string[];
}
