import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { RuleOperator } from '../entities/shipping-option-rule.entity';

export class CreateShippingOptionRuleDto {
  @ApiProperty({ example: 'sorul_60c72b2f9b1e8c001cf9fabc', description: 'Unique ShippingOptionRule ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'weight', description: 'Attribute on which the rule applies' })
  @IsString()
  @IsNotEmpty()
  attribute: string;

  @ApiProperty({ enum: RuleOperator, description: 'Operator of the rule' })
  @IsEnum(RuleOperator)
  operator: RuleOperator;

  @ApiProperty({ example: { min: 1, max: 10 }, description: 'Value for the rule', required: false, nullable: true })
  @IsOptional()
  @IsObject()
  value?: any | null;

  @ApiProperty({ description: 'Reference to ShippingOption by ID' })
  @IsMongoId()
  shipping_option: string;
}
