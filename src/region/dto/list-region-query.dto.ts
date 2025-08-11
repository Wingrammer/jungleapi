import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class ListRegionQueryDto {
  @IsOptional()
  @IsNumberString()
  skip?: number;

  @IsOptional()
  @IsNumberString()
  take?: number;

@IsOptional()
  @IsString()
  currency_code?: string;

  @IsOptional()
  name?: string; // filtre par nom
}