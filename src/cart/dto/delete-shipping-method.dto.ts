import { IsString } from 'class-validator';

export class DeleteShippingMethodsDTO {
  @IsString({ each: true })
  ids: string[] ;
}
