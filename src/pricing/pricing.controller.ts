import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ForbiddenException,
  Req,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { RolesGuard } from 'src/auth/roles.guards';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CreatePriceListRuleDto } from './dto/create-price-list-rule.dto';
import { UpdatePriceListRuleDto } from './dto/update-price-list-rule.dto';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { PriceListType } from './entities/price-list.entity';
import { UpdatePriceListDto } from './dto/update-price-list.dto';
import { UpdatePricePreferenceDto } from './dto/update-price-preference.dto';
import { CreatePriceRuleDto } from './dto/create-price-rule.dto';
import { UpdatePriceRuleDto } from './dto/update-price-rule.dto';
import { UpdatePriceSetDto } from './dto/update-price-set.dto';
import { CreatePriceSetDto } from './dto/create-price-set.dto';
import { CreatePriceDto } from './dto/create-price.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMoneyAmountDTO } from './dto/create-money-amount.dto';
import { MoneyAmount } from './entities/money-amount.entity';
import { CreatePricePreferenceDto } from './dto/create-price-preference.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pricing')

export class PricingController {
  constructor(private readonly pricingService: PricingService) {}


  /**CREATION D4UN PRIX */


  @Get('price')
  async getAllPrices() {
    return this.pricingService.findAllPrices();
  }

  @Get('price/:id')
  async getPriceById(@Param('id') id: string) {
    return this.pricingService.findPriceById(id);
  }

  @Delete('price/:id')
  async deletePrice(@Param('id') id: string) {
    return this.pricingService.removePrice(id);
  }

  @Put('price/:id')
  async updatePrice(@Param('id') id: string, @Body() dto: Partial<CreatePriceDto>) {
    return this.pricingService.updatePrice(id, dto);
  }

  /**
   * GESTION D'AMOUNTPRICE 
   */

  
  // Lister tous les MoneyAmount (prix)
  @Get('prices')
  async getAllAmountPrices(): Promise<MoneyAmount[]> {
    return this.pricingService.getAllPrices()
  }

  // Récupérer les prix pour un variant donné
  @Get('variant/:id/prices')
  async getPricesForVariant(@Param('id') variantId: string): Promise<MoneyAmount[]> {
    const prices = await this.pricingService.getPricesForVariant(variantId);
    if (!prices || prices.length === 0) {
      throw new NotFoundException(`No prices found for variant ${variantId}`);
    }
    return prices;
  }

 

  // Créer un nouveau MoneyAmount (prix), optionnellement lié à un variant
  @Post('prices')
  async createMoneyAmount(@Body() dto: CreateMoneyAmountDTO): Promise<MoneyAmount> {
    return this.pricingService.createMoneyAmount(dto);
  }


  // ────────────────  PRICE LIST RULE ────────────────

  /**  ADMIN ONLY - Créer une règle */
  @Post('price-list-rule')
  @Roles(Role.ADMIN)
  createPriceListRule(@Body() dto: CreatePriceListRuleDto) {
    return this.pricingService.createPriceListRule(dto);
  }

  /** TOUS RÔLES - Règles d’une PriceList */
  @Get('price-list-rule/price-list/:priceListId')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  getRulesByPriceList(@Param('priceListId') priceListId: string) {
    return this.pricingService.getRulesByPriceList(priceListId);
  }

  /**  TOUS RÔLES - Règles actives filtrées par attribut */
  @Get('price-list-rule/attribute/:attribute')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  getActiveRulesByAttribute(@Param('attribute') attribute: string) {
    return this.pricingService.getActiveRulesByAttribute(attribute);
  }

  /** ADMIN ONLY - Modifier une règle */
  @Patch('price-list-rule/:id')
  @Roles(Role.ADMIN)
  updatePriceListRule(@Param('id') id: string, @Body() dto: UpdatePriceListRuleDto) {
    return this.pricingService.updatePriceListRule(id, dto);
  }

  /** 👤 ADMIN ONLY - Supprimer une règle (soft delete) */
  @Delete('price-list-rule/:id')
  @Roles(Role.ADMIN)
  softDeletePriceListRule(@Param('id') id: string) {
    return this.pricingService.softDeletePriceListRule(id);
  }

  /**  ADMIN ONLY - Restaurer une règle supprimée */
  @Patch('price-list-rule/:id/restore')
  @Roles(Role.ADMIN)
  restorePriceListRule(@Param('id') id: string) {
    return this.pricingService.restorePriceListRule(id);
  }

  // ──────────────── PRICE LISTS ────────────────

  /**  ADMIN ONLY - Créer une PriceList */
  @Post('price-list')
  @Roles(Role.ADMIN)
  createPriceList(@Body() dto: CreatePriceListDto) {
    return this.pricingService.createPriceList(dto);
  }

  /**  TOUS RÔLES - Obtenir toutes les PriceLists */
  @Get('price-list')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  getAllPriceLists() {
    return this.pricingService.getAllPriceLists();
  }

  /**  TOUS RÔLES - Obtenir les PriceLists actives */
  @Get('price-list/active')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  getActivePriceLists() {
    return this.pricingService.getActivePriceLists();
  }

  /** TOUS RÔLES - Obtenir par type (SALE / OVERRIDE) */
  @Get('price-list/type/:type')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  getPriceListsByType(@Param('type') type: PriceListType) {
    return this.pricingService.getPriceListsByType(type);
  }

  /**  TOUS RÔLES - Obtenir une PriceList par ID */
  @Get('price-list/:id')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  getPriceList(@Param('id') id: string) {
    return this.pricingService.getPriceListById(id);
  }

  /**  ADMIN ONLY - Modifier une PriceList */
  @Patch('price-list/:id')
  @Roles(Role.ADMIN)
  updatePriceList(@Param('id') id: string, @Body() dto: UpdatePriceListDto) {
    return this.pricingService.updatePriceList(id, dto);
  }

  /**  ADMIN ONLY - Activer une PriceList */
  @Patch('price-list/:id/activate')
  @Roles(Role.ADMIN)
  activatePriceList(@Param('id') id: string) {
    return this.pricingService.activatePriceList(id);
  }

  /**  ADMIN ONLY - Désactiver une PriceList */
  @Patch('price-list/:id/deactivate')
  @Roles(Role.ADMIN)
  deactivatePriceList(@Param('id') id: string) {
    return this.pricingService.deactivatePriceList(id);
  }

  /**  ADMIN ONLY - Supprimer une PriceList */
  @Delete('price-list/:id')
  @Roles(Role.ADMIN)
  deletePriceList(@Param('id') id: string) {
    return this.pricingService.deletePriceList(id);
  }

  // ────────────────  APPLICABLE PRICELISTS FOR CUSTOMER ────────────────

  /**  CUSTOMER ONLY - Obtenir les PriceLists applicables à ce client */
  @Get('price-lists/applicable')
  @Roles(Role.CUSTOMER)
  getApplicable(@Query('customerId') customerId: string) {
    return this.pricingService.getApplicablePriceListsForCustomerId(customerId);
  }

  /**
   * 
   * 
   */

  // Créer une préférence tarifaire — ADMIN uniquement
  @Post('price-preference')
  async createPricePreference(@Body() dto: CreatePricePreferenceDto, @Req() req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException();
    return this.pricingService.createPricePreference(dto, req.user.role);
  }

  // Liste toutes les préférences — Tous rôles
  @Get('price-preference')
  async getAllPricePreferences() {
    return this.pricingService.getAllPricePreferences();
  }

  // Liste préférences par attribut — Tous rôles
  @Get('price-preference/attribute/:attribute')
  async getPricePreferencesByAttribute(@Param('attribute') attribute: string) {
    return this.pricingService.getPricePreferencesByAttribute(attribute);
  }

  // Modifier une préférence — ADMIN uniquement
  @Patch('price-preference/:id')
  async updatePricePreference(@Param('id') id: string, @Body() dto: UpdatePricePreferenceDto, @Req() req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException();
    return this.pricingService.updatePricePreference(id, dto, req.user.role);
  }

  // Soft delete une préférence — ADMIN uniquement
  @Delete('price-preference/:id')
  async softDeletePricePreference(@Param('id') id: string, @Req() req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException();
    return this.pricingService.softDeletePricePreference(id, req.user.role);
  }

  // Restaurer une préférence supprimée — ADMIN uniquement
  @Patch('price-preference/:id/restore')
  async restorePricePreference(@Param('id') id: string, @Req() req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException();
    return this.pricingService.restorePricePreference(id, req.user.role);
  }

  /**
   * 
   * 
   */

  @Roles(Role.ADMIN, Role.VENDOR)
  @Post('price-rule')
  createPriceRule(@Body() dto: CreatePriceRuleDto) {
    return this.pricingService.createPriceRule(dto);
  }

  @Roles(Role.ADMIN, Role.VENDOR)
  @Patch('price-rule/:id')
  updatePriceRule(@Param('id') id: string, @Body() dto: UpdatePriceRuleDto) {
    return this.pricingService.updatePriceRule(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete('price-rule/:id')
  deletePriceRule(@Param('id') id: string) {
    return this.pricingService.deletePriceRule(id);
  }

  @Roles(Role.ADMIN)
  @Patch('price-rule/:id/restore')
  restorePriceRule(@Param('id') id: string) {
    return this.pricingService.restorePriceRule(id);
  }

  @Roles(Role.ADMIN, Role.VENDOR)
  @Get('price-rule/price/:priceId')
  getRulesByPrice(@Param('priceId') priceId: string) {
    return this.pricingService.getPriceRulesByPrice(priceId);
  }

  @Roles(Role.ADMIN)
  @Get('price-rules')
  getAllActivePriceRules() {
    return this.pricingService.getAllActivePriceRules();
  }

    // POST /price-set
  @Roles(Role.ADMIN) // seul un admin crée un groupe de prix
  @Post('price-set')
  createPriceSet(@Body() dto: CreatePriceSetDto) {
    return this.pricingService.createPriceSet(dto);
  }

  // GET /price-set
  @Roles(Role.ADMIN)
  @Get('price-set')
  getAllPriceSets() {
    return this.pricingService.getAllPriceSets();
  }

  // GET /price-set/:id
  @Roles(Role.ADMIN, Role.VENDOR)
  @Get('price-set/:id')
  getPriceSet(@Param('id') id: string) {
    return this.pricingService.getPriceSetById(id);
  }

  // PATCH /price-set/:id
  @Roles(Role.ADMIN)
  @Patch('price-set/:id')
  updatePriceSet(@Param('id') id: string, @Body() dto: UpdatePriceSetDto) {
    return this.pricingService.updatePriceSet(id, dto);
  }

  // DELETE /price-set/:id
  @Roles(Role.ADMIN)
  @Delete('price-set/:id')
  deletePriceSet(@Param('id') id: string) {
    return this.pricingService.deletePriceSet(id);
  }


   @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  @Get('price/search')
  async searchPrices(
    @Query('regionId') regionId?: string,
    @Query('countryId') countryId?: string,
    @Query('productVariantId') productVariantId?: string,
  ) {
    return this.pricingService.findPricesByRegionCountryProductVariant(regionId, countryId, productVariantId);
  }

    @Get('price/currency/:currencyId')
       @Roles(Role.ADMIN, Role.CUSTOMER, Role.VENDOR)
  async getPricesByCurrency(@Param('currencyId') currencyId: string) {
    return this.pricingService.findPricesByCurrency(currencyId);
  }

  @Roles(Role.VENDOR)
  @Post('createprice')
  createPrice(@Body() dto: CreatePriceSetDto) {
    return this.pricingService.createPriceSet(dto);  // Passer l'objet DTO avec le tableau de prix
  }


}
