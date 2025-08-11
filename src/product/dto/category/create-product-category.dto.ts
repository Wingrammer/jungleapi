// dtos/category/create-product-category.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  name: string;

  @IsString()
  handle: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mpath?: string;

  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  is_internal?: boolean;

  @IsOptional()
  rank?: number;
}
