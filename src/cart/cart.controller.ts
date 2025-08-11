import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
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

@Controller('cart')
export class CartController {
  userService: any;
  lineItemModel: any;
  constructor(private readonly cartService: CartService) {}

  @Post()
 @UseGuards(AuthGuard('jwt'), RolesGuard)// Protège avec JWT + vérifie les rôles
  @Roles(Role.ADMIN, Role.VENDOR, Role.CUSTOMER) // Autorisé pour ces rôles
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createCarts(
    @Body() data: CreateCartDto | CreateCartDto[],
    @CurrentUser() user: User, // L'utilisateur connecté
  ): Promise<CartDTO[] | CartDTO> {
    const result = await this.cartService.createCarts(data, user);

    if (Array.isArray(result)) {
      return result.map(cart =>
        plainToInstance(CartDTO, cart, { excludeExtraneousValues: true }),
      );
    }

    return plainToInstance(CartDTO, result, { excludeExtraneousValues: true });
  }



  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Patch(':id')
  @Roles(Role.ADMIN,Role.VENDOR)
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }

}