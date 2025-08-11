import { IsNotEmpty, IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateLineItemTaxLineDTO {
  @IsNotEmpty()
  @IsString()
  itemId: string; // id du LineItem

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @IsOptional()
  @IsString()
  provider_id?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  tax_rate_id?: string;
}
