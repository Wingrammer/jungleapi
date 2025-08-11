import { IsOptional, IsString } from 'class-validator';

export class UpdateProductTagDto {
  @IsOptional()
  @IsString()
  name?: string;
}
