import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { TaxProvider } from './entities/tax-provider.entity';
import { TaxRateRule } from './entities/tax-rate-rule.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { TaxRate } from './entities/tax-rate.entity';
import { TaxRegion } from './entities/tax-region.entity';
import { Tax, TaxDocument } from './entities/tax.entity';

@Injectable()
export class TaxService {

  constructor(
      @InjectModel(TaxProvider.name) private readonly taxproviderModel: Model<TaxProvider>,
      @InjectModel(TaxRateRule.name) private readonly taxrateruleModel: Model<TaxRateRule>,
      @InjectModel(TaxRate.name) private readonly taxrateModel: Model<TaxRate>,
      @InjectModel(TaxRegion.name) private readonly taxregionModel: Model<TaxRegion>,
      @InjectModel(Tax.name) private readonly taxModel: Model<TaxDocument>,
  ) {}

  async findAll(): Promise<Tax[]> {
    return this.taxModel.find().populate('region').exec();
  }

  async findByRegion(regionId: string): Promise<Tax[]> {
   if (!isValidObjectId(regionId)) {
  throw new NotFoundException(`Invalid ID`);
  }

    const taxes = await this.taxModel.find({ region: regionId }).populate('region').exec();

    if (!taxes || taxes.length === 0) {
      throw new NotFoundException(`No taxes found for region ${regionId}`);
    }

    return taxes;
  }

  async create(createTaxDto: CreateTaxDto): Promise<Tax> {
    try {
      const createdTax = new this.taxModel(createTaxDto);
      return await createdTax.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create tax');
    }
  }

  async update(id: string, updateTaxDto: UpdateTaxDto): Promise<Tax> {
  if (!isValidObjectId(id)) {
    throw new NotFoundException(`Invalid ID`);
  }

    const tax = await this.taxModel.findByIdAndUpdate(id, updateTaxDto, { new: true });

    if (!tax) {
      throw new NotFoundException(`Tax with id ${id} not found`);
    }

    return tax;
  }

  async remove(id: string): Promise<void> {
  if (!isValidObjectId(id)) {
    throw new NotFoundException(`Invalid ID`);
  }

    const result = await this.taxModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Tax with id ${id} not found`);
    }
  }
  /**
   * Cherche la taxe applicable pour un produit + région
   */
  async getApplicableTax(regionId: string, productId: string): Promise<Tax | null> {
    const productTax = await this.taxModel
      .findOne({
        products: productId,
        region: regionId,
      })
      .lean<Tax>()
      .exec();

    if (productTax) return productTax;

    const regionTax = await this.taxModel
      .findOne({
        products: { $size: 0 },
        region: regionId,
      })
      .lean<Tax>()
      .exec();

    return regionTax;
  }



  /**
   * Calcule le montant de taxe
   */
  async calculateTaxAmount(
    price: number,
    quantity: number,
    tax: Tax,
  ): Promise<number> {
    return price * quantity * (tax.rate / 100);
  }
  
}
