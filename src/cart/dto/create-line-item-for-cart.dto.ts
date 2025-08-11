import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLineItemForCartDTO {
  @IsString()
  cart_id: string;

  @IsString()
  title: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @Type(() => Number)
  unit_price: number;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  variant_id?: string;

  @IsOptional()
  @IsString()
  product_id?: string;

  @IsOptional()
  @IsString()
  product_title?: string;

  @IsOptional()
  @IsString()
  product_description?: string;

  @IsOptional()
  @IsString()
  product_subtitle?: string;

  @IsOptional()
  @IsString()
  product_type?: string;

  @IsOptional()
  @IsString()
  product_type_id?: string;

  @IsOptional()
  @IsString()
  product_collection?: string;

  @IsOptional()
  @IsString()
  product_handle?: string;

  @IsOptional()
  @IsString()
  variant_sku?: string;

  @IsOptional()
  @IsString()
  variant_barcode?: string;

  @IsOptional()
  @IsString()
  variant_title?: string;

  @IsOptional()
  variant_option_values?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  requires_shipping?: boolean;

  @IsOptional()
  @IsBoolean()
  is_discountable?: boolean;

  @IsOptional()
  @IsBoolean()
  is_giftcard?: boolean;

  @IsOptional()
  @IsBoolean()
  is_tax_inclusive?: boolean;

  @IsOptional()
  @IsBoolean()
  is_custom_price?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  compare_at_unit_price?: number;

  @IsOptional()
  metadata?: Record<string, any>;
}
