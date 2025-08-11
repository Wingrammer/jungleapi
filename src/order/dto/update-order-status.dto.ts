import { IsEnum } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

/**
 *  DTO pour mettre à jour le statut d'une commande
 * Seul le vendeur peut envoyer ce DTO via un endpoint protégé.
 */
export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, { message: 'Le statut doit être une valeur valide de OrderStatus' })
  status: OrderStatus;
}
