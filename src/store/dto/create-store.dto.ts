// store/dto/update-store.dto.ts
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { StoreStatus } from '../update-store-status.dto';

export class CreateStoreDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  default_sales_channel_id?: string;

  @IsOptional()
  @IsString()
  default_region_id?: string;

  @IsOptional()
  @IsString()
  default_location_id?: string;

  @IsOptional()
  @IsEnum(StoreStatus)
  status?: StoreStatus;
}
