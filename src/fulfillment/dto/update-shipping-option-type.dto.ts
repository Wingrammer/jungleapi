import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingOptionTypeDto } from './create-shipping-option-type.dto';

export class UpdateShippingOptionTypeDto extends PartialType(CreateShippingOptionTypeDto) {}
