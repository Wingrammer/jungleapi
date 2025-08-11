import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class CreateCustomerGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsString()
  @IsOptional()
  created_by?: string;
}
