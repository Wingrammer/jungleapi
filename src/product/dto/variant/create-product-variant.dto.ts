import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  size: string;

  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsMongoId()
  productId: string;
}
