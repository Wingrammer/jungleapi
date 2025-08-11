import { PartialType } from '@nestjs/swagger';
import { CreatePriceDto } from './create-price.dto';

export class UpdatePricingDto extends PartialType(CreatePriceDto) {}
