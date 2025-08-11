import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFulfillmentProviderDto {
  @ApiProperty({ description: 'Unique ID with prefix "serpro"', example: 'serpro_60c72b2f9b1e8c001cf9f123' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Indicates if the provider is enabled', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_enabled?: boolean;
}
