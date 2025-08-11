// dtos/option/create-product-option.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateProductOptionDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  product_id?: string;
}
