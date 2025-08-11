import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsString()
  @IsNotEmpty()
  symbol_native: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  decimal_digits: number;

  @IsNumber()
  rounding: number;
}
