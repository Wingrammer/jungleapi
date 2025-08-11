import { PartialType } from '@nestjs/mapped-types';
import { CreateFulfillmentProviderDto } from './create-fulfillment-provider.dto';

export class UpdateFulfillmentProviderDto extends PartialType(CreateFulfillmentProviderDto) {}
