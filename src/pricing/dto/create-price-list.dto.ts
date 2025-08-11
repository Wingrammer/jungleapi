import { IsString, IsOptional, IsArray, IsEnum, IsDateString, IsMongoId } from 'class-validator';
import { PriceListStatus, PriceListType } from '../entities/price-list.entity';

export class CreatePriceListDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(PriceListStatus)
  status?: PriceListStatus;

  @IsOptional()
  @IsEnum(PriceListType)
  type?: PriceListType;

  @IsOptional()
  @IsDateString()
  starts_at?: Date;

  @IsOptional()
  @IsDateString()
  ends_at?: Date;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  prices?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  price_list_rules?: string[];
}
