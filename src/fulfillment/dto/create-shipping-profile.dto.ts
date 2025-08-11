import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId, IsObject } from 'class-validator';

export class CreateShippingProfileDto {
  @ApiProperty({ example: 'sp_60c72b2f9b1e8c001cf9fabd', description: 'Unique ShippingProfile ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Express Delivery', description: 'Name of the shipping profile' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'express', description: 'Type of the shipping profile' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: ['60c72b2f9b1e8c001cf9faa1'], description: 'Array of ShippingOption IDs', required: false })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  shipping_options?: string[];

  @ApiProperty({ example: {}, description: 'Additional metadata', required: false, nullable: true })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any> | null;

  @ApiProperty({ example: null, description: 'Soft delete date', required: false, nullable: true })
  @IsOptional()
  deleted_at?: Date | null;
}
