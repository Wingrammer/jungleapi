import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateShippingMethodTaxLineDTO {
  @IsString()
  code: string;

  @IsNumber()
  rate: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  provider_id?: string;

  @IsString()
  @IsOptional()
  tax_rate_id?: string;

  @IsString()
  shipping_method_id: string;
}

