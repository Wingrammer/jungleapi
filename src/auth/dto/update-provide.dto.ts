import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProviderDto {
  @IsString()
  provider: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  clientSecret?: string;

  @IsOptional()
  @IsString()
  redirectUri?: string;
}
