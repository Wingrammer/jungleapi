import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingOptionTypeDto {
  @ApiProperty({ example: 'sotype_60c72b2f9b1e8c001cf9fabd', description: 'Unique ShippingOptionType ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Express Delivery', description: 'Label of the shipping option type' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: 'Faster delivery within 1-2 days', description: 'Description of the shipping option type', required: false, nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({ example: 'express', description: 'Code for the shipping option type' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
