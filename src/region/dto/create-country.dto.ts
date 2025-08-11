import { IsString, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  iso_2: string;

  @IsString()
  iso_3: string;

  @IsString()
  num_code: string;

  @IsString()
  name: string;

  @IsString()
  display_name: string;

  @IsOptional()
  regionId?: string; // id de la région

  @IsOptional()
  metadata?: Record<string, any>;
}
