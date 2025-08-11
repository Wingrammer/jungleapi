import { IsString, IsOptional } from 'class-validator';

export class UpdateProductCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  handle?: string;

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
