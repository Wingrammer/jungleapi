import { IsString, IsOptional } from 'class-validator';

export class CreateProductCollectionDto {
  @IsString()
  title: string;

  @IsString()
  handle: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  rank?: number;
}
