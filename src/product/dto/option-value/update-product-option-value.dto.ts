import { IsOptional, IsString } from 'class-validator';

export class UpdateProductOptionValueDto {
  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  option_id?: string;
}
