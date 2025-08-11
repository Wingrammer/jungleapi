import { IsString, IsOptional } from 'class-validator';

export class UpdateProviderIdentityDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
