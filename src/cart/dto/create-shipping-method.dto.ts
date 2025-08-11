import { IsString, IsNumber, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateShippingMethodDTO {
  @IsString()
  cart_id: string; // 🗂 ID du panier cible

  @IsString()
  name: string; // ex: UPS, FedEx

  @IsNumber()
  amount: number; // ex: 3000 (cents)

  @IsOptional()
  @IsObject()
  description?: Record<string, any>; // texte ou données structurées

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>; // champ libre

  @IsOptional()
  @IsBoolean()
  is_tax_inclusive?: boolean; // true/false

  @IsOptional()
  @IsString()
  shipping_option_id?: string; // option liée (si pertinent)
}
