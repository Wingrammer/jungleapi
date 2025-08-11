import { IsString } from 'class-validator';

export class CreateProductOptionValueDto {
  @IsString()
  value: string;

  @IsString()
  option_id: string;
}
