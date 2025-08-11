import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderTransactionDto {
  @IsString()
  @IsNotEmpty()
  order: string;  // correspond à l'ObjectId de la commande

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency_code: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsString()
  @IsOptional()
  reference_id?: string;

  @IsString()
  @IsOptional()
  return?: string;

  @IsString()
  @IsOptional()
  exchange?: string;

  @IsString()
  @IsOptional()
  claim?: string;
}
