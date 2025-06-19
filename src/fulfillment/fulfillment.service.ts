import { Injectable } from '@nestjs/common';
import { CreateFulfillmentDto } from './dto/create-fulfillment.dto';
import { UpdateFulfillmentDto } from './dto/update-fulfillment.dto';

@Injectable()
export class FulfillmentService {
  create(createFulfillmentDto: CreateFulfillmentDto) {
    return 'This action adds a new fulfillment';
  }

  findAll() {
    return `This action returns all fulfillment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fulfillment`;
  }

  update(id: number, updateFulfillmentDto: UpdateFulfillmentDto) {
    return `This action updates a #${id} fulfillment`;
  }

  remove(id: number) {
    return `This action removes a #${id} fulfillment`;
  }
}
