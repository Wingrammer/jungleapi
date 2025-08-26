import {
  IsString, IsOptional, IsEnum, IsArray, IsMongoId,
  IsNotEmpty, IsNumber
} from 'class-validator';
import { ProductStatus } from '../product-enum';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;  // Cela peut être une chaîne ou un tableau de chaînes représentant les URL des images

  @IsOptional()
  @IsArray()
  variants?: {
    size: string;
    color: string;
    price: number;
    stock: number;
  }[];
}
