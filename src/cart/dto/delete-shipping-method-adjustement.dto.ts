import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteShippingMethodAdjustmentsDTO {
  @IsString({ each: true })
  @Type(() => String)
  ids: string[] | string;
}
