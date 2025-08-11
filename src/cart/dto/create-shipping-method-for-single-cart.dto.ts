import { IsString, IsNumber, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateShippingMethodForSingleCartDTO {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsObject()
  description?: Record<string, any>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  is_tax_inclusive?: boolean;

  @IsOptional()
  @IsString()
  shipping_option_id?: string;
}
