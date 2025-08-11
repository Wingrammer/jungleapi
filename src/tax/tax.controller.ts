import { Controller, Get, Post, Body, Patch, Param, Delete,  UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Tax } from './entities/tax.entity';

@Controller('tax')

export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  @Roles(Role.ADMIN, Role.VENDOR)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createTaxDto: CreateTaxDto): Promise<Tax> {
    return this.taxService.create(createTaxDto);
  }

  @Get('')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  async findAll(): Promise<Tax[]> {
    return this.taxService.findAll();
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto): Promise<Tax> {
    return this.taxService.update(id, updateTaxDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.VENDOR)
  async remove(@Param('id') id: string): Promise<void> {
    return this.taxService.remove(id);
  }
}
