import { PartialType } from '@nestjs/mapped-types';
import { CreateFulfillmentItemDto } from './create-fulfillment-item.dto';

export class UpdateFulfillmentItemDto extends PartialType(CreateFulfillmentItemDto) {}
