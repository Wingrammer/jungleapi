import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceSetDto } from './create-price-set.dto';

export class UpdatePriceSetDto extends PartialType(CreatePriceSetDto) {}
