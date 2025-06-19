import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FulfillmentService } from './fulfillment.service';
import { CreateFulfillmentDto } from './dto/create-fulfillment.dto';
import { UpdateFulfillmentDto } from './dto/update-fulfillment.dto';

@Controller('fulfillment')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Post()
  create(@Body() createFulfillmentDto: CreateFulfillmentDto) {
    return this.fulfillmentService.create(createFulfillmentDto);
  }

  @Get()
  findAll() {
    return this.fulfillmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fulfillmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFulfillmentDto: UpdateFulfillmentDto) {
    return this.fulfillmentService.update(+id, updateFulfillmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fulfillmentService.remove(+id);
  }
}
