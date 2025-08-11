import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingOptionDto } from './create-shipping-option.dto';

export class UpdateShippingOptionDto extends PartialType(CreateShippingOptionDto) {}
