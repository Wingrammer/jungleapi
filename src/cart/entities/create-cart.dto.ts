import { IsString, IsOptional, IsEmail, IsObject } from 'class-validator';

export class CreateCartDto {
  @IsString()
  currency_code: string;

  @IsOptional()
  @IsString()
  region_id?: string;

  @IsOptional()
  @IsString()
  customer_id?: string;

  @IsOptional()
  @IsString()
  sales_channel_id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
