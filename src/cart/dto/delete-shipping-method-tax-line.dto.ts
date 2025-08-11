import { IsString } from 'class-validator';

export class DeleteShippingMethodTaxLinesDTO {
  @IsString({ each: true })
  ids: string[] | string;
}
