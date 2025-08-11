import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  readonly company_name: string;

  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsBoolean()
  @IsOptional()
  readonly has_account?: boolean;

  @IsOptional()
  readonly metadata?: Record<string, any>;

  @IsString()
  @IsOptional()
  readonly created_by?: string;
}
