// create-store-currency.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  currency_code: string;

  @IsBoolean()
  @IsOptional()
  is_default?: boolean;

  @IsString()
  @IsOptional()
  store?: string;
}
