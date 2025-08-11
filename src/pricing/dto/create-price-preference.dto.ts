import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePricePreferenceDto {
  @IsString()
  attribute: string;

  @IsString()
  value: string;

  @IsBoolean()
  @IsOptional()
  is_tax_inclusive?: boolean;
}
