import { IsOptional, IsString } from 'class-validator';

export class ListCountryQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  iso_2?: string;

  @IsOptional()
  @IsString()
  region_id?: string;
}
