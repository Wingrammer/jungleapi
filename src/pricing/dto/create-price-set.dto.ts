import { IsArray, IsMongoId } from 'class-validator';
import { CreatePriceDto } from './create-price.dto';

export class CreatePriceSetDto {
  @IsArray()
  @IsMongoId({ each: true })
 prices: CreatePriceDto[];
}
