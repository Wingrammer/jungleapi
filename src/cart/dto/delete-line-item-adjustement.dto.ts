import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteLineItemAdjustmentsDTO {
  @IsString({ each: true })
  @Type(() => String)
  ids: string[] | string;
}
