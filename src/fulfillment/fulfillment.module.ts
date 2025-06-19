import { Module } from '@nestjs/common';
import { FulfillmentService } from './fulfillment.service';
import { FulfillmentController } from './fulfillment.controller';

@Module({
  controllers: [FulfillmentController],
  providers: [FulfillmentService],
})
export class FulfillmentModule {}
