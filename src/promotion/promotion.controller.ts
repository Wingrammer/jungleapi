import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, Patch, NotFoundException, Req, BadRequestException} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guards';
import { AuthRequest } from 'src/types/auth-request';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  
  @Get('me')
  getMyProducts(@Req() req) {
    return this.promotionService.findAllByUser(req.user.sub);
  }


  @Post()
  create(@Body() dto: CreatePromotionDto) {
    return this.promotionService.create(dto);
  }

  @Delete(':id')
async softDelete(@Param('id') id: string) {
  return this.promotionService.softDelete(id);
}

 
  @Get('toutes-promotions')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.promotionService.findAll();
  }

  //LES ADMINI AURONS ACCES A MODIFIER AUTOMATIQUEMENT LE STATUS DES PROMOTIONS 

  @Patch('maj-statuts')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  forceUpdateStatus() {
    return this.promotionService.updateAllStatuses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.VENDOR)
  remove(@Param('id') id: string) {
    return this.promotionService.remove(id);
  }

  @Post(':id/discount')
  async calculateDiscount(
    @Param('id') id: string,
    @Body() payload: { cart: any },
  ) {
    const promo = await this.promotionService.findOne(id);
    if (!promo) {
  throw new NotFoundException('Promotion introuvable');
}
    return this.promotionService.calculatePromotionDiscount(promo, payload.cart);
  }

  @Post(':id/eligibility')
  async isEligible(
    @Param('id') id: string,
    @Body() payload: { cart: any; user: any },
  ) {
    const promo = await this.promotionService.findOne(id);
    if (!promo) {
  throw new NotFoundException('Promotion introuvable');
  }
    return this.promotionService.isPromotionEligible(promo, payload.cart, payload.user);
  }
}
