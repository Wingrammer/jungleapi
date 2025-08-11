// src/order/dto/create-order-change-action.dto.ts
import { IsUUID, IsNotEmpty, IsEnum } from 'class-validator';

export enum OrderActionType {
  ITEM_ADD = 'ITEM_ADD',
  ITEM_REMOVE = 'ITEM_REMOVE',
  ADDRESS_UPDATE = 'ADDRESS_UPDATE',
  PAYMENT_CAPTURE = 'PAYMENT_CAPTURE',
  // Ajoute ici d’autres actions possibles si besoin
}

export class CreateOrderChangeActionDTO {
  @IsUUID()
  @IsNotEmpty()
  order_id: string;

  @IsUUID()
  @IsNotEmpty()
  order_change_id: string;

  @IsEnum(OrderActionType)
  @IsNotEmpty()
  action: OrderActionType;
}
