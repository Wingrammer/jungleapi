import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateAuthIdentityDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string; // Si tu veux gérer email à part

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  password: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
