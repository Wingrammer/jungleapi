import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFulfillmentSetDto {
  @ApiProperty({ description: 'Unique ID with prefix "fuset"', example: 'fuset_60c72b2f9b1e8c001cf9f123' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Name of the fulfillment set', example: 'Main Warehouse' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type of fulfillment set', example: 'warehouse' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'List of ServiceZone IDs', type: [String], example: ['60c72b2f9b1e8c001cf9f124'] })
  @IsArray()
  service_zones: Types.ObjectId[] | string[];

  @ApiProperty({ description: 'Optional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiProperty({ description: 'Soft delete timestamp', required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  deleted_at?: Date | null;
}
