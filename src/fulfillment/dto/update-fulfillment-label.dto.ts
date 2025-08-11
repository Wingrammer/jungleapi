import { PartialType } from '@nestjs/mapped-types';
import { CreateFulfillmentLabelDto } from './create-fulfillment-label.dto';

export class UpdateFulfillmentLabelDto extends PartialType(CreateFulfillmentLabelDto) {}
