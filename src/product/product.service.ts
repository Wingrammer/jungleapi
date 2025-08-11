import { BadRequestException, Body, ForbiddenException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductStatus } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductCategoryDto } from './dto/category/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/category/update-product-category.dto';
import { ProductCollection } from './entities/product-collection.entity';
import { CreateProductCollectionDto } from './dto/collection/create-product-collection.dto';
import { UpdateProductCollectionDto } from './dto/collection/update-product-collection.dto';
import { ProductOption } from './entities/product-option.entity';
import { CreateProductOptionDto } from './dto/option/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/option/update-product-option.dto';
import { ProductOptionValue } from './entities/product-option-value.entity';
import { CreateProductOptionValueDto } from './dto/option-value/create-product-option-value.dto';
import { UpdateProductOptionValueDto } from './dto/option-value/update-product-option-value.dto';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductVariantDto } from './dto/variant/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/variant/update-product-variant.dto';
import { CreateProductTagDto } from './dto/tage/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/tage/update-product-tag.dto';
import { ProductTag } from './entities/product-tag.entity';
import { ProductType } from './entities/product-type.entity';
import { CreateProductTypeDto } from './dto/type/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/type/update-product-type.dto';
import { CreateProductImageDto } from './dto/image/create-product-image.dto';
import { Store } from 'src/store/entities/store.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(ProductCategory.name) private readonly categoryModel: Model<ProductCategory>,
    @InjectModel(ProductCollection.name) private readonly collectionModel: Model<ProductCollection>,
    @InjectModel(ProductOption.name) private readonly optionModel: Model<ProductOption>,
    @InjectModel(ProductOptionValue.name) private readonly optionValueModel: Model<ProductOptionValue>,
    @InjectModel(ProductVariant.name) private readonly variantModel: Model<ProductVariant>,
    @InjectModel(ProductTag.name) private readonly tagModel: Model<ProductTag>,
    @InjectModel(ProductType.name) private readonly typeModel: Model<ProductType>,
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    // Ajoute ici les autres modèles
  ) {}




  async findAllByUser(userId: string) {
    return this.productModel.find({ where: { ownerId: userId } });
  }
  // product.service.ts (bloc Product)

 async findAllByStoreId(storeId: string) {
  return this.productModel.find({
    store: storeId,
  }).populate('store');  // Assurez-vous que "store" est une référence à un autre modèle (par exemple, le modèle Store).
 }


 


 /**LES FONCTION POUR CHANGERLE STATUS DES PRODUITS ? DRAF, PROPO */

 //Le vendeur va prposer un produit 

 

  //l'admini publie le produit 

  async publishProduct(productId: string) {
  const product = await this.productModel.findById(productId);
  if(!product){
    throw new ForbiddenException();
  }
  product.status = ProductStatus.PUBLISHED;
  return product.save();
 }

 async create(dto: CreateProductDto, storeId: string): Promise<Product> {
  const product = new this.productModel({
    ...dto,
    store: storeId,  // Assurez-vous que store est un ObjectId référent un document "Store"
  });
  return product.save();
 }

 

 //l'adimin le regete LE PRODUIT
 async rejectProduct(productId: string) {
  const product = await this.productModel.findById(productId);
  if(!product){
    throw new ForbiddenException();
  }
  product.status = ProductStatus.REJECTED;
  return product.save();
  }

  //un produit 

    async revertToDraft(productId: string, vendorId: string) {
    const product = await this.productModel.findById(productId);
    if (!product || product.store.toString() !== vendorId) {
      throw new ForbiddenException();
    }

    // Seulement si produit est proposé ou rejeté
    if (![ProductStatus.PROPOSED, ProductStatus.REJECTED].includes(product.status)) {
      throw new BadRequestException('Le produit ne peut pas être remis en draft');
    }

    product.status = ProductStatus.DRAFT;
    return product.save();
  }



 //**SEULELEMENT LES PRODUITS QUI ON UN STATUT PUBLISHED QUI SERONT VUS DE TOUS */
  async getPublishedProducts(): Promise<Product[]> {
  return this.productModel.find({ status: 'published' }).exec();
  }
 //**IMPORTANT  FILTRE ET PAGINATION DES PRODUIT PUNLIER*/

 



  async find(filter?: any) {
    return this.productModel.find(filter).exec();
  }

  async findByIdAndDelete(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  // (si tu ne l'as pas déjà)
 
  // product.service.ts//important

  async recommendProductsByBudget(budget: number): Promise<Product[]> {
    return this.productModel.find({
      'variants.prices.amount': { $lte: budget * 100 }, // si en centimes
    })
    .limit(20)
    .sort({ 'variants.prices.amount': 1 }) // du moins cher au plus cher
    .populate('variants')
    .exec();
  }

 

  async proposeProduct(productId: string, storeId: string) {
  const product = await this.productModel.findById(productId);
  if (!product || product.store.toString() !== storeId) {
    throw new ForbiddenException();
  }
  product.status = ProductStatus.PROPOSED;
  return product.save();
}




  async findAllAdmin(): Promise<Product[]> {
    return this.productModel.find().populate('user').exec();
  }

  async findAll(): Promise<Product[]> {
  return this.productModel.find().populate('category', 'title').exec();
 }


  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('vendor').exec();
    if (!product) {
      throw new NotFoundException(`Produit avec l'id ${id} introuvable`);
    }
    return product;
  }

 async changeProductStatus(productId: string, status: ProductStatus): Promise<Product> {
  const product = await this.productModel.findById(productId);

  if (!product) {
    throw new NotFoundException(`Produit avec l'id ${productId} introuvable`);
  }

  // Vérification des transitions de statuts
  if (
    (status === ProductStatus.PUBLISHED && product.status !== ProductStatus.PROPOSED) ||
    (status === ProductStatus.REJECTED && product.status !== ProductStatus.PROPOSED) ||
    (status === ProductStatus.DRAFT && ![ProductStatus.PUBLISHED, ProductStatus.REJECTED].includes(product.status))
  ) {
    throw new BadRequestException(`Transition de statut non permise`);
  }

  product.status = status;
  return product.save();
}


async createProduct(dto: CreateProductDto): Promise<Product> {
  const product = new this.productModel(dto);
  return product.save();
}

async softDeleteProduct(id: string): Promise<Product> {
  const product = await this.productModel.findById(id);

  if (!product) {
    throw new NotFoundException(`Produit avec l'id ${id} introuvable`);
  }

  return product;
}

 async restoreEntity<T extends Document>(model: Model<T>, id: string): Promise<T | null> {
  const entity = await model.findByIdAndUpdate(
    id, 
    { deleted_at: null }, 
    { new: true }
  );

  if (!entity) {
    throw new NotFoundException(`Entité avec l'id ${id} introuvable`);
  }

  return entity; // Pas besoin de casting, car TypeScript comprend le type maintenant
}
 

  async getProductsWithFilters(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, any> = {},
  sort: string = '-createdAt'
) {
  const skip = (page - 1) * limit;
  
  // Filtrer dynamiquement
  const query: any = { status: 'published' };

  // Recherche par mot-clé
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  // Filtre par catégorie
  if (filters.category) query.category = filters.category;

  // Filtre par prix
  if (filters.minPrice !== undefined) {
    query.price = { ...query.price, $gte: filters.minPrice };
  }

  if (filters.maxPrice !== undefined) {
    query.price = { ...query.price, $lte: filters.maxPrice };
  }

  // Recherche des produits
  const products = await this.productModel
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await this.productModel.countDocuments(query);

  return {
    data: products,
    meta: {
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}


  async remove(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id);
  }



  async updateProduct(id: string, dto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProduct(title: string, dto: CreateProductDto) {
    return this.productModel.findOneAndUpdate(
      { title },
      dto,
      { upsert: true, new: true }
    );
  }



  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async restoreProduct(id: string) {
    return this.productModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProducts() {
    return this.productModel.find({ deleted_at: null });
  }
/**IMPORATNT
 * 
 */
  async listAndCountProducts() {
    const docs = await this.productModel.find({ deleted_at: null });
    const count = await this.productModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProduct(id: string) {
    return this.productModel.findById(id);
  }


  //product category
  async createProductCategory(dto: CreateProductCategoryDto) {
    return this.categoryModel.create(dto);
  }

  async updateProductCategory(id: string, dto: UpdateProductCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProductCategory(handle: string, dto: CreateProductCategoryDto) {
    return this.categoryModel.findOneAndUpdate(
      { handle },
      dto,
      { upsert: true, new: true }
    );
  }

  async softDeleteProductCategory(id: string) {
    return this.categoryModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async deleteProductCategory(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }

  async restoreProductCategory(id: string) {
    return this.categoryModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProductCategories() {
    return this.categoryModel.find({ deleted_at: null });
  }

  async listAndCountProductCategories() {
    const docs = await this.categoryModel.find({ deleted_at: null });
    const count = await this.categoryModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProductCategory(id: string) {
    return this.categoryModel.findById(id);
  }

  //collection

  // product.service.ts (bloc complet)

  async createProductCollection(dto: CreateProductCollectionDto) {
    return this.collectionModel.create(dto);
  }

  async updateProductCollection(id: string, dto: UpdateProductCollectionDto) {
    return this.collectionModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProductCollection(handle: string, dto: CreateProductCollectionDto) {
    return this.collectionModel.findOneAndUpdate(
      { handle },
      dto,
      { upsert: true, new: true }
    );
  }

  async softDeleteProductCollection(id: string) {
    return this.collectionModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async deleteProductCollection(id: string) {
    return this.collectionModel.findByIdAndDelete(id);
  }

  async restoreProductCollection(id: string) {
    return this.collectionModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProductCollections() {
    return this.collectionModel.find({ deleted_at: null });
  }

  async listAndCountProductCollections() {
    const docs = await this.collectionModel.find({ deleted_at: null });
    const count = await this.collectionModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProductCollection(id: string) {
    return this.collectionModel.findById(id);
  }

  //  ProductOption

  async createProductOption(dto: CreateProductOptionDto) {
    return this.optionModel.create(dto);
  }

  async updateProductOption(id: string, dto: UpdateProductOptionDto) {
    return this.optionModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProductOption(title: string, dto: CreateProductOptionDto) {
    return this.optionModel.findOneAndUpdate(
      { title },
      dto,
      { upsert: true, new: true }
    );
  }

  async softDeleteProductOption(id: string) {
    return this.optionModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async deleteProductOption(id: string) {
    return this.optionModel.findByIdAndDelete(id);
  }

  async restoreProductOption(id: string) {
    return this.optionModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProductOptions() {
    return this.optionModel.find({ deleted_at: null });
  }

  async listAndCountProductOptions() {
    const docs = await this.optionModel.find({ deleted_at: null });
    const count = await this.optionModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProductOption(id: string) {
    return this.optionModel.findById(id);
  }

  //option-value // product.service.ts (bloc complet ProductOptionValue)

  async createProductOptionValue(dto: CreateProductOptionValueDto) {
    return this.optionValueModel.create(dto);
  }

  async updateProductOptionValue(id: string, dto: UpdateProductOptionValueDto) {
    return this.optionValueModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProductOptionValue(value: string, dto: CreateProductOptionValueDto) {
    return this.optionValueModel.findOneAndUpdate(
      { value },
      dto,
      { upsert: true, new: true }
    );
  }

  async softDeleteProductOptionValue(id: string) {
    return this.optionValueModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async deleteProductOptionValue(id: string) {
    return this.optionValueModel.findByIdAndDelete(id);
  }

  async restoreProductOptionValue(id: string) {
    return this.optionValueModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProductOptionValues() {
    return this.optionValueModel.find({ deleted_at: null });
  }

  async listAndCountProductOptionValues() {
    const docs = await this.optionValueModel.find({ deleted_at: null });
    const count = await this.optionValueModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProductOptionValue(id: string) {
    return this.optionValueModel.findById(id);
  }
//ProductVriant

// product.service.ts (bloc complet ProductVariant)
 async findAllWithRelations() {
    return this.variantModel.find()
      .populate('product')
      .populate('prices')
      .exec();
  }

  async createVariant(dto: any) {
    const variant = new this.variantModel({
      ...dto,
      prices: dto.prices.map(p => ({
        amount: Math.round(p.amount * 100), // Convertir en centimes
        currency: p.currency,
        region: p.region || null
      }))
    });
    return variant.save();
  }

  async createProductVariant(dto: CreateProductVariantDto) {
    return this.variantModel.create(dto);
  }

  async updateProductVariant(id: string, dto: UpdateProductVariantDto) {
    return this.variantModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProductVariant(sku: string, dto: CreateProductVariantDto) {
    return this.variantModel.findOneAndUpdate(
      { sku },
      dto,
      { upsert: true, new: true }
    );
  }

  async softDeleteProductVariant(id: string) {
    return this.variantModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async deleteProductVariant(id: string) {
    return this.variantModel.findByIdAndDelete(id);
  }

  async restoreProductVariant(id: string) {
    return this.variantModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProductVariants() {
    return this.variantModel.find({ deleted_at: null });
  }

  async listAndCountProductVariants() {
    const docs = await this.variantModel.find({ deleted_at: null });
    const count = await this.variantModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProductVariant(id: string) {
    return this.variantModel.findById(id);
  }


    async findByIdAndUpdate(id: string, dto: UpdateProductDto, options = {}): Promise<Product> {
      const updatedProduct = await this.productModel.findByIdAndUpdate(id, dto, options).exec();
      if (!updatedProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return updatedProduct;
    }
  //product tags


  

  // product.service.ts (bloc ProductTag)

  async createProductTag(dto: CreateProductTagDto) {
    return this.tagModel.create(dto);
  }

  async updateProductTag(id: string, dto: UpdateProductTagDto) {
    return this.tagModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProductTag(name: string, dto: CreateProductTagDto) {
    return this.tagModel.findOneAndUpdate(
      { name },
      dto,
      { upsert: true, new: true }
    );
  }

  async softDeleteProductTag(id: string) {
    return this.tagModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async deleteProductTag(id: string) {
    return this.tagModel.findByIdAndDelete(id);
  }

  async restoreProductTag(id: string) {
    return this.tagModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProductTags() {
    return this.tagModel.find({ deleted_at: null });
  }

  async listAndCountProductTags() {
    const docs = await this.tagModel.find({ deleted_at: null });
    const count = await this.tagModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProductTag(id: string) {
    return this.tagModel.findById(id);
  }
//tag

// product.service.ts (bloc ProductType)

  async createProductType(dto: CreateProductTypeDto) {
    return this.typeModel.create(dto);
  }

  async updateProductType(id: string, dto: UpdateProductTypeDto) {
    return this.typeModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async upsertProductType(name: string, dto: CreateProductTypeDto) {
    return this.typeModel.findOneAndUpdate(
      { name },
      dto,
      { upsert: true, new: true }
    );
  }

  async softDeleteProductType(id: string) {
    return this.typeModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async deleteProductType(id: string) {
    return this.typeModel.findByIdAndDelete(id);
  }

  async restoreProductType(id: string) {
    return this.typeModel.findByIdAndUpdate(id, { deleted_at: null });
  }

  async listProductTypes() {
    return this.typeModel.find({ deleted_at: null });
  }

  async listAndCountProductTypes() {
    const docs = await this.typeModel.find({ deleted_at: null });
    const count = await this.typeModel.countDocuments({ deleted_at: null });
    return { docs, count };
  }

  async retrieveProductType(id: string) {
    return this.typeModel.findById(id);
  }


//tag

// product.service.ts (bloc ProductType)

  async createProductImage(dto: CreateProductImageDto) {
    return this.typeModel.create(dto);
  }

  


}
