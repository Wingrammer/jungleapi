// dtos/option/update-product-option.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateProductOptionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  product_id?: string;
}
