import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { FulfillmentService } from './fulfillment.service';
import { CreateFulfillmentDto } from './dto/create-fulfillment.dto';
import { UpdateFulfillmentDto } from './dto/update-fulfillment.dto';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateFulfillmentAddressDto } from './dto/update-fulfillment-address.dto';

@Controller('fulfillment')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Post()
  @Roles(Role.ADMIN, Role.VENDOR)
 // Admin et Vendor peuvent créer
  async create(@Body() createFulfillmentDto: CreateFulfillmentDto) {
    return this.fulfillmentService.create(createFulfillmentDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.VENDOR, Role.CUSTOMER)
 // Tous peuvent voir la liste
  async findAll() {
    return this.fulfillmentService.findAll();
  }

  @Get(':id')
    @Roles(Role.ADMIN, Role.VENDOR, Role.CUSTOMER)
  async findOne(@Param('id') id: string) {
    const fulfillment = await this.fulfillmentService.findOne(id);
    if (!fulfillment) {
      throw new NotFoundException(`Fulfillment with ID ${id} not found`);
    }
    return fulfillment;
  }

  @Get('shipping-options/valid')
  @Roles(Role.ADMIN, Role.VENDOR, Role.CUSTOMER)
  async getValidShippingOptions(
    @Query('totalWeight') totalWeight: number,
    @Query('countryCode') countryCode: string,
    @Query('subtotal') subtotal: number,
  ) {
    const weightNum = Number(totalWeight);
    const subtotalNum = Number(subtotal);

    return this.fulfillmentService.getValidShippingOptions({
      totalWeight: weightNum,
      countryCode,
      subtotal: subtotalNum,
    });
  }

  // ----------------------
// CRUD Fulfillment Address (avec @Roles(Role.))
// ----------------------

// CREATE
 @Delete(':fulfillmentId/addresses/:addressId')
  @Roles(Role.ADMIN, Role.VENDOR)
  deleteFulfillmentAddress(
    @Param('fulfillmentId') fulfillmentId: string,
    @Param('addressId') addressId: string
  ) {
    return this.fulfillmentService.deleteFulfillmentAddress(fulfillmentId, addressId);
  }


// READ
  @Get(':fulfillmentId/address')
  @Roles(Role.ADMIN, Role.VENDOR, Role.CUSTOMER)
  async getAddress(@Param('fulfillmentId') fulfillmentId: string) {
    return this.fulfillmentService.getFulfillmentAddress(fulfillmentId);
  }

  // UPDATE
  @Patch(':fulfillmentId/address/:addressId')
  @Roles(Role.ADMIN, Role.VENDOR)
  async updateAddress(
    @Param('fulfillmentId') fulfillmentId: string,
    @Param('addressId') addressId: string,
    @Body() dto: UpdateFulfillmentAddressDto,
  ) {
    return this.fulfillmentService.updateFulfillmentAddress(
      fulfillmentId,
      addressId,
      dto,
    );
  }

// DELETE
  @Delete(':fulfillmentId/address/:addressId')
  @Roles(Role.ADMIN, Role.VENDOR)
  async deleteAddress(
    @Param('fulfillmentId') fulfillmentId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.fulfillmentService.deleteFulfillmentAddress(
      fulfillmentId,
      addressId,
    );
  }

}
