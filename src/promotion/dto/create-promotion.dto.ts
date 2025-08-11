import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(['percentage', 'fixed'])
  discount_type: 'percentage' | 'fixed';

  @IsNumber()
  @Min(0)
  value: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_cart_total?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @IsOptional()
  @IsBoolean()
  applies_to_shipping?: boolean;

  @IsOptional()
  @IsArray()
  products?: string[];

  @IsOptional()
  @IsArray()
  collections?: string[];

  @IsOptional()
  @IsArray()
  categories?: string[];

  @IsOptional()
  @IsArray()
  customerGroups?: string[];

  @IsOptional()
  @IsArray()
  regions?: string[];

  @IsOptional()
  metadata?: Record<string, any>;
}
