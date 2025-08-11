// store/dto/update-store-status.dto.ts
import { IsEnum, IsOptional } from 'class-validator';

export enum StoreStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateStoreStatusDto {
  @IsOptional()
  @IsEnum(StoreStatus, { message: "Le statut doit être 'active' ou 'inactive'." })
  status?: StoreStatus;
}
