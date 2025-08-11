// create-product.dto.ts
import {
  IsString, IsOptional, IsBoolean, IsEnum, IsNumber, IsArray, IsMongoId
} from 'class-validator';
import { ProductStatus } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  handle: string;

  @IsMongoId()
  store: string; // Champ store obligatoire ajouté

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_giftcard?: boolean;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsString()
  origin_country?: string;

  @IsOptional()
  @IsString()
  hs_code?: string;

  @IsOptional()
  @IsString()
  mid_code?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsBoolean()
  discountable?: boolean;

  @IsOptional()
  @IsString()
  external_id?: string;

  @IsOptional()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  variants?: string[];

  @IsOptional()
  @IsMongoId()
  type?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  options?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  images?: string[];

  @IsOptional()
  @IsMongoId()
  collection?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];
}