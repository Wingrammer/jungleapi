import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFulfillmentLabelDto {
  @ApiProperty({ description: 'Unique ID with prefix "fulla"', example: 'fulla_60c72b2f9b1e8c001cf9f123' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Tracking number of the label' })
  @IsString()
  tracking_number: string;

  @ApiProperty({ description: 'Tracking URL' })
  @IsString()
  tracking_url: string;

  @ApiProperty({ description: 'Label URL' })
  @IsString()
  label_url: string;

  @ApiProperty({ description: 'Fulfillment reference ID (ObjectId)' })
  @IsString()
  fulfillment: Types.ObjectId | string;
}
