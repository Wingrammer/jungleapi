import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMoneyAmountDTO {
  @IsNumber()
  amount: number;

  @IsString()
  currency_code: string;

  @IsOptional()
  variant_id?: string; // Pour lier à un ProductVariant directement si souhaité
}
