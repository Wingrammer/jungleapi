import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './entities/product.entity';
import { ProductCollection, ProductCollectionSchema } from './entities/product-collection.entity';

import { ProductOptionValue, ProductOptionValueSchema } from './entities/product-option-value.entity';
import { ProductVariant, ProductVariantSchema } from './entities/product-variant.entity';
import { ProductTag, ProductTagSchema } from './entities/product-tag.entity';
import { ProductType, ProductTypeSchema } from './entities/product-type.entity';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductOption, ProductOptionSchema } from './entities/product-option.entity';
import { CloudinaryModule } from './cloudinary.module';
import { Store, StoreSchema } from 'src/store/entities/store.entity';
import { StoreModule } from 'src/store/store.module';
import { StoreGuard } from 'src/store/store.guard';
import { ProductCategory, ProductCategorySchema } from './entities/product-category.entity';

@Module({
  imports: [
    StoreModule, 
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductCategory.name, schema: ProductCategorySchema },
      { name: ProductCollection.name, schema: ProductCollectionSchema },
      { name: ProductOption.name, schema: ProductOptionSchema },
      { name: ProductOptionValue.name, schema: ProductOptionValueSchema },
      { name: ProductVariant.name, schema: ProductVariantSchema },
      { name: ProductTag.name, schema: ProductTagSchema },
      { name: ProductType.name, schema: ProductTypeSchema },
      { name: Store.name, schema: StoreSchema },
      
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, StoreGuard],
})
export class ProductModule {}
 