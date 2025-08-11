import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateReturnDto {
  @IsString()
  orderId: string;

  @IsArray()
  items: any[]; // tu peux mettre un DTO pour les items aussi

  @IsNumber()
  amount: number;
}
