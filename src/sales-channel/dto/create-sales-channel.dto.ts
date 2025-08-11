import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSalesChannelDto {
  @ApiProperty({ description: 'Name of the sales channel' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the sales channel' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Disable the sales channel' })
  @IsBoolean()
  @IsOptional()
  is_disabled?: boolean;

  @ApiPropertyOptional({ description: 'Metadata object', type: Object })
  @IsOptional()
  metadata?: Record<string, unknown>;
}
