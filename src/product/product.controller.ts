import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, Req, UseGuards, Query, BadRequestException, UnauthorizedException, NotFoundException, Type ,Request} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/variant/create-product-variant.dto';
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
import { User } from 'src/user/entities/user.entity';
import { ProductStatus } from './product-enum';



@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,

  ) {}

  // ==============================================
  // SECTION 1: CORE PRODUCT OPERATIONS
  // ==============================================
  
/*
  @Get(':id')
  @Roles(Role.ADMIN, Role.VENDOR)
  findOne(@Param('id') id: string) {
    return this.productService.retrieveProduct(id);
  }*/

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




  @UseGuards(JwtAuthGuard, StoreGuard)
  @Roles(Role.ADMIN, Role.VENDOR)
  @Post(':storeId')
  async createProduct(
    @Param('storeId') storeId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.createProductInStore(dto, storeId);
  }

@UseGuards(JwtAuthGuard, StoreGuard)
@Roles(Role.ADMIN, Role.VENDOR, Role.CUSTOMER)
  @Get('store/:storeId')
  async getProducts(
    @Param('storeId') storeId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string
    
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
  console.log('storeId reçu:', storeId); 
    // Construction des paramètres de recherche
    const queryOptions: any = {
      storeId,
      page: pageNum,
      limit: limitNum,
    };

    if (search) queryOptions.search = search;

    // Appel du service pour récupérer les produits
    return this.productService.getProductsForStore({
  storeId,
  page: pageNum,
  limit: limitNum,
  search,
});

}

/*
  @UseGuards(JwtAuthGuard, StoreGuard)
  @Roles(Role.ADMIN, Role.VENDOR)
 
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))  // 'image' est le nom du champ dans le formulaire
  async createProduct2(
    @Body() createProductDto: any,
    @UploadedFile() file: Express.Multer.File,  // Le fichier téléchargé
  ) {
    // Créer un produit avec l'image téléchargée
    return this.productService.createProduct(createProductDto, file);
  }


  // product.controller.ts
@UseGuards(AuthGuard('jwt'), StoreGuard)

    @Post(':storeId')
    async createProduct(
      @Param('storeId') storeId: string,
      @Body() createProductDto: CreateProductDto,
    ) {
      return this.productService.create({
        ...createProductDto,
        store: storeId, // On injecte le storeId ici
      });
    }
*/

@UseGuards(AuthGuard('jwt'), StoreGuard)
@Get('my') 
async getMyProducts(
  @Req() req: Request & { store: any },
  @Query() query: { page?: string; limit?: string; sort?: string }
) {
  const store = req.store;

  if (!store) {
    throw new NotFoundException("Aucune boutique trouvée pour cet utilisateur.");
  }

  const page = query.page ? parseInt(query.page, 10) : 1;
  const limit = query.limit ? parseInt(query.limit, 10) : 10;
  const sort = query.sort ?? '-createdAt';

  return this.productService.getProductsWithFilters(
    { storeId: store.id },
    page,
    limit,
    sort
  );
}



@Get('filter')
async filterProducts(
  @Query('storeId') storeId: string,
  @Query('minPrice') minPrice?: string,
  @Query('maxPrice') maxPrice?: string,
  @Query('size') size?: string,
  @Query('color') color?: string,
) {
  return this.productService.getProductsByVariantAndPrice(storeId, {
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    size,
    color,
  });
}




  @Get('public')
  async getAllPublicProducts() {
    return this.productService.getAllPublicProducts();
  }

  @Get()
  async getAllProduct(){
    return this.productService.findAll()
  }
 
 


  // ==============================================
  // SECTION 4: PRODUCT VARIANTS
  // ==============================================


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

  @Post('category')
  @Roles(Role.ADMIN, Role.VENDOR)
  createCategory(@Body() dto: CreateProductCategoryDto) {
    return this.productService.createCategory(dto);
  }

  @Get('category')
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
      filters,            // Filtrage dynamique basé sur les paramètres
      Number(page),       // Page convertie en nombre
      Number(limit),      // Limit converti en nombre
      
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


    @Get('recommandes')
    async getRecommendedProducts(@Query('budget') budget: string) {
      const numericBudget = parseFloat(budget);
      return this.productService.recommendProductsByBudget(numericBudget);
    }

    @Post('recommandes')
    async postRecommendedProducts(@Body('budget') budget: number) {
      return this.productService.recommendProductsByBudget(budget);
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

  @Get('categorie')
  async getAllWithCategory() {
    return this.productService.findAllByCtegorie();
  }

  @Post('categorie')
  async postAllWithCategory() {
    return this.productService.findAllByCtegorie();
  }
}