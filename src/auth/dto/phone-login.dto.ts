import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateProviderIdentityDto {
  @IsString()
  userId: string;

  @IsString()
  provider: string; // Ex: 'google', 'facebook'

  @IsString()
  providerId: string; // ID renvoyé par le provider (ex: sub OAuth)

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  displayName?: string;
}
