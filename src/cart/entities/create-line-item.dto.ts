// src/line-item/dto/create-line-item.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateLineItemDto {
  @IsString()
  cart_id: string;

  @IsString()
  variant_id: string;

  @IsNumber()
  quantity: number;

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
  title?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  variant_title?: string;

  @IsOptional()
  @IsString()
  variant_sku?: string;

  @IsOptional()
  @IsString()
  variant_barcode?: string;

  @IsOptional()
  @IsBoolean()
  is_giftcard?: boolean;

  @IsOptional()
  @IsBoolean()
  is_discountable?: boolean;

  @IsOptional()
  @IsBoolean()
  is_tax_inclusive?: boolean;

  @IsOptional()
  @IsBoolean()
  is_custom_price?: boolean;

  @IsOptional()
  @IsNumber()
  compare_at_unit_price?: number;

  @IsOptional()
  @IsNumber()
  unit_price?: number;

  @IsOptional()
  variant_option_values?: Record<string, any>;

  @IsOptional()
  metadata?: Record<string, any>;
}
