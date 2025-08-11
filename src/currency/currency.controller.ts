import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}


  @Get()
  getCurrencies() {
    return this.currencyService.findAll();
  }

  @Get()
  async listCurrencies() {
    return this.currencyService.listCurrencies();
  }

  @Get('count')
  async listAndCountCurrencies() {
    return this.currencyService.listAndCountCurrencies();
  }

  @Get(':code')
  async retrieveCurrency(@Param('code') code: string) {
    return this.currencyService.retrieveCurrency(code);
  }
}
