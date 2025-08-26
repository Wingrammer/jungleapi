import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CartService } from "./cart.service";

import { Role } from "src/auth/role.enum";
import { Roles } from "src/auth/roles.decorator";
import { User } from "src/user/entities/user.entity";
import { CartDTO } from "./dto/cart.dto";
import { plainToInstance } from "class-transformer";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { CreateCartDto } from "./dto/create-cart.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guards";
import { CurrentUser } from "src/auth/current-user.decorator";
import { Cart } from "./entities/cart.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('cart')
export class CartController {
  userService: any;
  lineItemModel: any;
  constructor(private readonly cartService: CartService) {}


  @Post('panier')
  async createCart(@Body() dto: CreateCartDto) {
    return this.cartService.createCart(dto);
  }

  @Post('item')
  async addItem(
    @Param('cartId') cartId: string,
    @Body() productData: any,
  ) {
    return this.cartService.addProductToCart(cartId, productData);
  }

  // Récupérer les produits du panier
  @Get(':cartId/items')
  async getItems(@Param('cartId') cartId: string) {
    return this.cartService.getCartItems(cartId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCartByCustomer(@Req() req, @Body() createCartDto: CartDTO) {
    return this.cartService.createCartByCustomer(req, createCartDto);
  }


  // Récupérer tous les paniers d’un client
  @Get('customer/:customerId')
  async getCartsByCustomerId(
    @Param('customerId') customerId: string,
  ): Promise<Cart[]> {
    return await this.cartService.getCartsByCustomerId(customerId);
  }


  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }

}