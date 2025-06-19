import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesChannelService } from './sales-channel.service';
import { CreateSalesChannelDto } from './dto/create-sales-channel.dto';
import { UpdateSalesChannelDto } from './dto/update-sales-channel.dto';

@Controller('sales-channel')
export class SalesChannelController {
  constructor(private readonly salesChannelService: SalesChannelService) {}

  @Post()
  create(@Body() createSalesChannelDto: CreateSalesChannelDto) {
    return this.salesChannelService.create(createSalesChannelDto);
  }

  @Get()
  findAll() {
    return this.salesChannelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesChannelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesChannelDto: UpdateSalesChannelDto) {
    return this.salesChannelService.update(+id, updateSalesChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesChannelService.remove(+id);
  }
}
