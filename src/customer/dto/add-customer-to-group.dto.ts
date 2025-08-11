import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class AddCustomerToGroupDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;  // Id du customer (ObjectId en string)

  @IsString()
  @IsNotEmpty()
  groupId: string;  // Id du customer group (ObjectId en string)

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
