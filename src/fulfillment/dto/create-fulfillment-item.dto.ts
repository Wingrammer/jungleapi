import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFulfillmentItemDto {
  @ApiProperty({ description: 'Unique ID with prefix "fulit"', example: 'fulit_x1y2z3a4b' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Title of the item' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'SKU of the item' })
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Barcode of the item' })
  @IsString()
  barcode: string;

  @ApiProperty({ description: 'Quantity, must be positive' })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiPropertyOptional({ description: 'Line item ID' })
  @IsOptional()
  @IsString()
  line_item_id?: string;

  @ApiPropertyOptional({ description: 'Inventory item ID' })
  @IsOptional()
  @IsString()
  inventory_item_id?: string;

  @ApiProperty({ description: 'Fulfillment reference ID (ObjectId)' })
  @IsString()
  fulfillment: Types.ObjectId | string;

  @ApiPropertyOptional({ description: 'Deletion date' })
  @IsOptional()
  deleted_at?: Date;
}
