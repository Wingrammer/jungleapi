import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingOptionRuleDto } from './create-shipping-option-rule.dto';

export class UpdateShippingOptionRuleDto extends PartialType(CreateShippingOptionRuleDto) {}
