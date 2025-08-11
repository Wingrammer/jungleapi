import { IsArray, IsDate, IsIn, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency_code: string;

  @IsString()
  provider_id: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsDate()
  captured_at?: Date;

  @IsOptional()
  @IsDate()
  canceled_at?: Date;

  @IsMongoId()
  payment_collection: string;

  @IsOptional()
  @IsMongoId()
  payment_session?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  refunds?: string[];

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'captured', 'refunded'])
  status?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  captures?: string[];
}
