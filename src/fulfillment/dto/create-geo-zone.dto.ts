import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsMongoId, IsDateString } from 'class-validator';
import { GeoZoneType } from '../entities/geo-zone.entity';

export class CreateGeoZoneDto {
  @ApiProperty({ example: 'fgz_60c72b2f9b1e8c001cf9f999', description: 'Unique GeoZone ID' })
  @IsString()
  id: string;

  @ApiProperty({ enum: GeoZoneType, default: GeoZoneType.COUNTRY })
  @IsEnum(GeoZoneType)
  type: GeoZoneType;

  @ApiProperty({ example: 'US', description: 'Country code' })
  @IsString()
  @IsNotEmpty()
  country_code: string;

  @ApiProperty({ example: 'CA', description: 'Province code', required: false, nullable: true })
  @IsOptional()
  @IsString()
  province_code?: string | null;

  @ApiProperty({ example: 'Los Angeles', required: false, nullable: true })
  @IsOptional()
  @IsString()
  city?: string | null;

  @ApiProperty({ example: { pattern: '900\\d{2}' }, required: false, type: Object, nullable: true })
  @IsOptional()
  @IsObject()
  postal_expression?: Record<string, unknown> | null;

  @ApiProperty({ description: 'Reference to ServiceZone by ID' })
  @IsMongoId()
  service_zone: string;

  @ApiProperty({ example: {}, required: false, type: Object, nullable: true })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown> | null;

  @ApiProperty({ example: '2025-01-01T00:00:00Z', required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  deleted_at?: Date | null;
}
