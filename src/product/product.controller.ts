import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, Req, UseGuards, Query, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ProductStatus } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/variant/create-product-variant.dto';
import { CreateProductCategoryDto } from './dto/category/create-product-category.dto';
import { CreateProductCollectionDto } from './dto/collection/create-product-collection.dto';
import { CreateProductTagDto } from './dto/tage/create-product-tag.dto';
import { CreateProductOptionDto } from './dto/option/create-product-option.dto';
import { CreateProductOptionValueDto } from './dto/option-value/create-product-option-value.dto';
import { CurrentStore } from 'src/store/current-store.decorator';
import { Store } from 'src/store/entities/store.entity';
import { OwnerGuard } from 'src/auth/owner.guard';
import { AuthRequest } from 'src/types/auth-request';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { StoreGuard } from 'src/auth/StoreAuthGuard';

// DTO Imports

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ==============================================
  // SECTION 1: CORE PRODUCT OPERATIONS
  // ==============================================
  

  @Get('retrive')
  @Roles(Role.ADMIN, Role.VENDOR)
  findOne(@Param('id') id: string) {
    return this.productService.retrieveProduct(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.VENDOR)
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.VENDOR)
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
/*
  @UseGuards(AuthGuard('jwt'), StoreGuard)
  @Get('store/me')
  async getVendorProducts(@CurrentStore() store: Store) {
    return this.productService.findAllByStoreId(store.id);
  }
*/
/*
  @UseGuards(AuthGuard('jwt'), StoreGuard)
  @Post('me')
  async createProductForVendor(@CurrentStore() store: Store,@Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create({
      store: store.id, // ou store._id selon ton typage
    });
  }
*/
 @UseGuards(AuthGuard('jwt'), StoreGuard)
  @Post('create')
  async createProduct(@Req() req: Request, @Body() dto: CreateProductDto) {
    const store = (req as any).store; // injecté par le StoreGuard
    if (!store) {
      throw new BadRequestException('Boutique non trouvée pour cet utilisateur');
    }

    const productData = { ...dto, store: store._id }; // Associe l’ID du store
    console.log('Produit à créer :', productData); // debug

    return this.productService.create(productData);
  }


// product.controller.ts
  @UseGuards(AuthGuard('jwt'), StoreGuard)
  @Get('me')
  async getMyProducts(@Req() req: Request & { store: any }) {
    const store = req.store;
    return this.productService.findByStoreId(store._id);
  }
 
  // ==============================================
  // SECTION 2: PRODUCT STATUS MANAGEMENT
  // ==============================================

  @Put(':id/revert-draft')
  @Roles(Role.VENDOR)
  revertDraft(@Param('id') id: string) {
    return this.productService.changeProductStatus(id, ProductStatus.DRAFT);
  }

  @Put(':id/propose')
  @Roles(Role.VENDOR)
  proposeProduct(@Param('id') id: string) {
    return this.productService.changeProductStatus(id, ProductStatus.PROPOSED);
  }

  @Put(':id/publish')
  @Roles(Role.ADMIN)
  publishProduct(@Param('id') id: string) {
    return this.productService.changeProductStatus(id, ProductStatus.PUBLISHED);
  }

  @Put(':id/reject')
  @Roles(Role.ADMIN)
  rejectProduct(@Param('id') id: string) {
    return this.productService.changeProductStatus(id, ProductStatus.REJECTED);
  }


  // ==============================================
  // SECTION 3: PRODUCT IMAGE MANAGEMENT
  // ==============================================



  // ==============================================
  // SECTION 4: PRODUCT VARIANTS
  // ==============================================

  @Post('variants')
  @Roles(Role.ADMIN, Role.VENDOR)
  createVariant(@Body() dto: CreateProductVariantDto) {
    return this.productService.createVariant(dto);
  }

  @Get('variants')
  @Roles(Role.ADMIN, Role.VENDOR)
  listVariants() {
    return this.productService.listProductVariants();
  }

  @Get('variants/:id')
  @Roles(Role.ADMIN, Role.VENDOR)
  getVariant(@Param('id') id: string) {
    return this.productService.retrieveProductVariant(id);
  }

  // ==============================================
  // SECTION 5: PRODUCT CATEGORIES
  // ==============================================

  @Post('categories')
  @Roles(Role.ADMIN, Role.VENDOR)
  createCategory(@Body() dto: CreateProductCategoryDto) {
    return this.productService.createProductCategory(dto);
  }

  @Get('categories')
  listCategories() {
    return this.productService.listProductCategories();
  }

  // ==============================================
  // SECTION 6: PRODUCT COLLECTIONS
  // ==============================================

  @Post('collections')
  @Roles(Role.ADMIN, Role.VENDOR)
  createCollection(@Body() dto: CreateProductCollectionDto) {
    return this.productService.createProductCollection(dto);
  }

  @Get('collections')
  listCollections() {
    return this.productService.listProductCollections();
  }

  // ==============================================
  // SECTION 7: PRODUCT TAGS
  // ==============================================

  @Post('tags')
  @Roles(Role.ADMIN, Role.VENDOR)
  createTag(@Body() dto: CreateProductTagDto) {
    return this.productService.createProductTag(dto);
  }

  @Get('tags')
  @Roles(Role.ADMIN, Role.VENDOR)
  listTags() {
    return this.productService.listProductTags();
  }


  @Post('options')
  @Roles(Role.ADMIN, Role.VENDOR)
  createOption(@Body() dto: CreateProductOptionDto) {
    return this.productService.createProductOption(dto);
  }

  @Post('option-values')
  @Roles(Role.ADMIN, Role.VENDOR)
  createOptionValue(@Body() dto: CreateProductOptionValueDto) {
    return this.productService.createProductOptionValue(dto);
  }

  // ==============================================
  // SECTION 9: PUBLIC ENDPOINTS
  // ==============================================
@Get('public/pagination')
async getPublishedProducts(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('search') search = '',
  @Query('sort') sort = '-createdAt',
  @Query('category') category?: string,
  @Query('minPrice') minPrice?: string,
  @Query('maxPrice') maxPrice?: string
) {
  // Convertir les minPrice et maxPrice en nombres si définis
  const filters = {
    search,
    category,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,  // Utilisation de parseFloat pour plus de sécurité
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,  // Utilisation de parseFloat pour plus de sécurité
  };

  // Appel du service pour obtenir les produits avec les filtres
  return this.productService.getProductsWithFilters(
    Number(page),       // Page convertie en nombre
    Number(limit),      // Limit converti en nombre
    filters,            // Filtrage dynamique basé sur les paramètres
    sort                // Tri des produits
  );
}


  @Get('recommendations')
  async getRecommendations(@Query('budget') budget: string) {
    const parsedBudget = parseFloat(budget);
    if (isNaN(parsedBudget)) {
      throw new BadRequestException('Budget must be a valid number');
    }
    return this.productService.recommendProductsByBudget(parsedBudget);
  }


  @Patch(':id/soft-delete')
  @Roles(Role.ADMIN, Role.VENDOR)
  softDelete(@Param('id') id: string) {
    return this.productService.softDeleteProduct(id);
  }

  @Post(':id/restore')
  @Roles(Role.ADMIN, Role.VENDOR)
  restore(@Param('id') id: string) {
    return this.productService.restoreProduct(id);
  }
}