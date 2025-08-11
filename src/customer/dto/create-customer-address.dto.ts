import { IsString, IsOptional, IsBoolean, IsObject, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCustomerAddressDto {
  @IsString()
  @IsNotEmpty()
  address_name: string;

  @IsBoolean()
  @IsOptional()
  is_default_shipping?: boolean;

  @IsBoolean()
  @IsOptional()
  is_default_billing?: boolean;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsNotEmpty()
  address_1: string;

  @IsString()
  @IsOptional()
  address_2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  country_code?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  postal_code?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
