// dto/create-store-with-user.dto.ts
import { IsEmail, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateStoreWithUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  is_active?: boolean;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
