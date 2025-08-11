import { IsString, IsOptional } from 'class-validator';

export class UpdateProductCollectionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  handle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  rank?: number;
}
