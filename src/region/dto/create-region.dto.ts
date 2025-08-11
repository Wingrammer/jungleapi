import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateRegionDto {

  @IsString()
  countryIds: string;
  @IsString()
  name: string;

  @IsString()
  currency_code: string;

  @IsBoolean()
  @IsOptional()
  automatic_taxes?: boolean;

  @IsOptional()
  metadata?: Record<string, any>;
}
