import { PartialType } from '@nestjs/mapped-types';
import { CreateFulfillmentAddressDto } from './create-fulfilment-address.dto';

export class UpdateFulfillmentAddressDto extends PartialType(CreateFulfillmentAddressDto) {}
