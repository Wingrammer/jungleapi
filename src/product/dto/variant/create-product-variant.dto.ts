import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  sku: string;

  @IsNumber()
  price: number;

  @IsString()
  product_id: string;

  @IsOptional()
  @IsString({ each: true })
  option_value_ids?: string[];
}
