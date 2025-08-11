import { PartialType } from '@nestjs/mapped-types';
import { CreateFulfillmentSetDto } from './create-fulfillment-set.dto';

export class UpdateFulfillmentSetDto extends PartialType(CreateFulfillmentSetDto) {}
