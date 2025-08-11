import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsString()
  address_1: string;

  @IsOptional()
  @IsString()
  address_2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  country_code: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
