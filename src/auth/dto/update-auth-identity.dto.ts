import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateAuthIdentityDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
