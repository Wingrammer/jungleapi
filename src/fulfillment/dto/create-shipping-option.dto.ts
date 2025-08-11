import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ShippingOptionPriceType } from '../entities/shipping-option.entity';

export class CreateShippingOptionDto {
  @ApiProperty({ example: 'so_60c72b2f9b1e8c001cf9fabd', description: 'Unique ShippingOption ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Standard Shipping', description: 'Name of the shipping option' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ShippingOptionPriceType, example: ShippingOptionPriceType.FLAT, description: 'Type of price calculation' })
  @IsEnum(ShippingOptionPriceType)
  price_type: ShippingOptionPriceType;

  @ApiProperty({ example: {}, description: 'Additional data for the shipping option', required: false, nullable: true })
  @IsOptional()
  @IsObject()
  data?: Record<string, any> | null;

  @ApiProperty({ example: {}, description: 'Metadata related to the shipping option', required: false, nullable: true })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any> | null;

  @ApiProperty({ example: '60c72b2f9b1e8c001cf9faa1', description: 'ID of the related ServiceZone' })
  @IsMongoId()
  service_zone: string;

  @ApiProperty({ example: '60c72b2f9b1e8c001cf9faa2', description: 'ID of the related ShippingProfile', required: false, nullable: true })
  @IsOptional()
  @IsMongoId()
  shipping_profile?: string | null;

  @ApiProperty({ example: '60c72b2f9b1e8c001cf9faa3', description: 'ID of the related FulfillmentProvider', required: false, nullable: true })
  @IsOptional()
  @IsMongoId()
  provider?: string | null;

  @ApiProperty({ example: '60c72b2f9b1e8c001cf9faa4', description: 'ID of the related ShippingOptionType', required: false, nullable: true })
  @IsOptional()
  @IsMongoId()
  type?: string | null;

  @ApiProperty({ example: [], description: 'List of ShippingOptionRule IDs', required: false })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  rules?: string[];

  @ApiProperty({ example: [], description: 'List of Fulfillment IDs', required: false })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  fulfillments?: string[];
}
