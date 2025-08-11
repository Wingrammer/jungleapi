import { IsString, IsOptional, IsNumber, IsObject, IsMongoId } from 'class-validator';

export class CreateLineItemAdjustmentDTO {
  /**
   * Identifiant du LineItem auquel l'ajustement est lié (ObjectId)
   */
  @IsMongoId()
  item: string;

  /**
   * Code promo ou identifiant de l'ajustement
   */
  @IsString()
  code: string;

  /**
   * Montant de l'ajustement (>= 0)
   */
  @IsNumber()
  amount: number;

  /**
   * Description optionnelle
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Provider ID optionnel
   */
  @IsOptional()
  @IsString()
  provider_id?: string;

  /**
   * Promotion ID optionnel
   */
  @IsOptional()
  @IsString()
  promotion_id?: string;

  /**
   * Métadonnées optionnelles (objet libre)
   */
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
  item_id: number;
}
