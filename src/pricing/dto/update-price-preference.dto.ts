import { PartialType } from '@nestjs/mapped-types';
import { CreatePricePreferenceDto } from './create-price-preference.dto';

export class UpdatePricePreferenceDto extends PartialType(CreatePricePreferenceDto) {}
