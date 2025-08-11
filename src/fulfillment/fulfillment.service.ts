import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFulfillmentDto } from './dto/create-fulfillment.dto';
import { UpdateFulfillmentDto } from './dto/update-fulfillment.dto';
import { FulfillmentItem } from './entities/fulfillment-item.entity';
import { FulfillmentLabel } from './entities/fulfillment-label.entity';
import { FulfillmentProvider } from './entities/fulfillment-provider.entity';
import { FulfillmentSet } from './entities/fulfillment-set.entity';
import { Fulfillment } from './entities/fulfillment.entity';
import { GeoZone } from './entities/geo-zone.entity';
import { ServiceZone } from './entities/service-zone.entity';
import { ShippingOption } from './entities/shipping-option.entity';
import { ShippingOptionRule } from './entities/shipping-option-rule.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FulfillmentAddress } from './entities/fulfillment-address.entity';
import { Order } from 'src/order/entities/CommandePrincipale/order.entity';
import { CreateFulfillmentAddressDto } from './dto/create-fulfilment-address.dto';

@Injectable()
export class FulfillmentService {
   constructor(
    @InjectModel(FulfillmentAddress.name) private readonly fulfillmentAddressModel: Model<FulfillmentAddress>,
    @InjectModel(FulfillmentItem.name) private readonly fulfillmentItemModel: Model<FulfillmentItem>,
    @InjectModel(FulfillmentLabel.name) private readonly fulfillmentLabelModel: Model<FulfillmentLabel>,
    @InjectModel(FulfillmentProvider.name) private readonly fulfillmentProviderModel: Model<FulfillmentProvider>,
    @InjectModel(FulfillmentSet.name) private readonly fulfillmentSetModel: Model<FulfillmentSet>,
    @InjectModel(GeoZone.name) private readonly geoZoneModel: Model<GeoZone>,
    @InjectModel(ServiceZone.name) private readonly serviceZoneModel: Model<ServiceZone>,
    @InjectModel(ShippingOption.name) private readonly shippingOptionModel: Model<ShippingOption>,
    @InjectModel(Fulfillment.name) private readonly fulfillmentModel: Model<Fulfillment>,
    //@InjectModel(ShippingOptionRule.name) private readonly shippingOptionRuleModel: Model<ShippingOptionRule>,
    //@InjectModel(ShippingOptionType.name) private readonly shippingOptionTypeModel: Model<ShippingOptionType>,
    //@InjectModel(ShippingProfile.name) private readonly shippingProfileModel: Model<ShippingProfile>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,

) {}

  private isShippingOptionRule(
    rule: Types.ObjectId | ShippingOptionRule
  ): rule is ShippingOptionRule {
    return typeof rule === 'object' && 'attribute' in rule;
  }


  async create(createFulfillmentDto: CreateFulfillmentDto): Promise<Fulfillment> {
    const orderExists = await this.orderModel.exists({ _id: createFulfillmentDto.order });
    if (!orderExists) {
      throw new NotFoundException('commande non trouver');
    }
    const created = new this.fulfillmentModel(createFulfillmentDto);
    return created.save();
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Fulfillment[]; total: number; page: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.fulfillmentModel.find({ deleted_at: null }).skip(skip).limit(limit).populate('order').exec(),
      this.fulfillmentModel.countDocuments({ deleted_at: null }),
    ]);
    return { data, total, page };
  }

  async findOne(id: string): Promise<Fulfillment> {
    const fulfillment = await this.fulfillmentModel.findOne({ _id: id, deleted_at: null }).populate('order').exec();
    if (!fulfillment) {
      throw new NotFoundException(`Fulfillment with id ${id} not found`);
    }
    return fulfillment;
  }

  async update(id: string, updateFulfillmentDto: UpdateFulfillmentDto): Promise<Fulfillment> {
    const updated = await this.fulfillmentModel.findOneAndUpdate(
      { _id: id, deleted_at: null },
      updateFulfillmentDto,
      { new: true }
    ).exec();

    if (!updated) {
      throw new NotFoundException(`Fulfillment with id ${id} not found or deleted`);
    }
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    const deleted = await this.fulfillmentModel.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() }
    ).exec();

    if (!deleted) {
      throw new NotFoundException(`Fulfillment with id ${id} not found or already deleted`);
    }
  }

  async hardDelete(id: string): Promise<void> {
    const result = await this.fulfillmentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Fulfillment with id ${id} not found`);
    }
  }

  // Exemple : créer une adresse liée à un fulfillment
  async createFulfillmentAddress(dto: CreateFulfillmentAddressDto) {
    const fulfillment = await this.fulfillmentModel.findById(dto.fulfillment);
    if (!fulfillment) {
      throw new Error('Fulfillment not found');
    }
    const address = new this.fulfillmentAddressModel(dto);
    return address.save();
  }

 
  // Récupérer une adresse par son id
  async getFulfillmentAddressById(id: string): Promise<FulfillmentAddress | null> {
    return this.fulfillmentAddressModel.findById(id).exec();
  }

  // Ajouter un item à un fulfillment
  async addFulfillmentItem(dto: Partial<FulfillmentItem>): Promise<FulfillmentItem> {
    const fulfillment = await this.fulfillmentModel.findById(dto.fulfillment);
    if (!fulfillment) {
      throw new Error('Fulfillment not found');
    }
    const item = new this.fulfillmentItemModel(dto);
    return item.save();
  }

  // Obtenir tous les items d’un fulfillment
  async getFulfillmentItemsByFulfillment(fulfillmentId: string): Promise<FulfillmentItem[]> {
    return this.fulfillmentItemModel.find({ fulfillment: fulfillmentId }).exec();
  }

  // Créer un label
  async createFulfillmentLabel(dto: Partial<FulfillmentLabel>): Promise<FulfillmentLabel> {
    const fulfillment = await this.fulfillmentModel.findById(dto.fulfillment);
    if (!fulfillment) {
      throw new Error('Fulfillment not found');
    }
    const label = new this.fulfillmentLabelModel(dto);
    return label.save();
  }

  // Récupérer les labels d’un fulfillment
  async getLabelsByFulfillment(fulfillmentId: string): Promise<FulfillmentLabel[]> {
    return this.fulfillmentLabelModel.find({ fulfillment: fulfillmentId }).exec();
  }

  // Liste des providers activés
  async getAllFulfillmentProviders(): Promise<FulfillmentProvider[]> {
    return this.fulfillmentProviderModel.find({ is_enabled: true }).exec();
  }

  // Activer un provider
  async enableProvider(id: string): Promise<FulfillmentProvider | null> {
    return this.fulfillmentProviderModel.findByIdAndUpdate(id, { is_enabled: true }, { new: true }).exec();
  }

  // Désactiver un provider
  async disableProvider(id: string): Promise<FulfillmentProvider | null> {
    return this.fulfillmentProviderModel.findByIdAndUpdate(id, { is_enabled: false }, { new: true }).exec();
  }

  // Liste des sets
  async getAllFulfillmentSets(): Promise<FulfillmentSet[]> {
    return this.fulfillmentSetModel.find().exec();
  }

  // Récupérer zones géographiques d’une zone de service
  async getGeoZonesByServiceZone(serviceZoneId: string): Promise<GeoZone[]> {
    return this.geoZoneModel.find({ service_zone: serviceZoneId, deleted_at: null }).exec();
  }

  // Obtenir une zone de service complète
  async getServiceZoneDetails(id: string): Promise<ServiceZone | null> {
    return this.serviceZoneModel.findById(id).exec();
  }

  // Obtenir options d’expédition d’une zone de service
  async getShippingOptionsByServiceZone(serviceZoneId: string): Promise<ShippingOption[]> {
    return this.shippingOptionModel.find({ service_zone: serviceZoneId }).exec();
  }

  // Ajouter une option d’expédition
  async addShippingOption(dto: Partial<ShippingOption>): Promise<ShippingOption> {
    const serviceZone = await this.serviceZoneModel.findById(dto.service_zone);
    if (!serviceZone) {
      throw new Error('Service zone not found');
    }
    const shippingOption = new this.shippingOptionModel(dto);
    return shippingOption.save();
  }

  /**
 * Trouve les ShippingOptions valides pour un panier donné
 * en appliquant les règles configurées (poids, pays, prix...)
 */
async getValidShippingOptions(orderData: {
  totalWeight: number;
  countryCode: string;
  subtotal: number;
}) {
  //  Récupérer toutes les options + règles + zone
  const allOptions = await this.shippingOptionModel
    .find()
    .populate('rules')  // indispensable pour avoir des ShippingOptionRule complets
    .populate('service_zone')
    .exec();

  //  Filtrer : chaque option doit satisfaire TOUTES ses règles
  const validOptions = allOptions.filter(option => {
    return option.rules.every(rule => {
      if (!this.isShippingOptionRule(rule)) {
        throw new Error(
          `Rule is not populated. Did you forget .populate('rules') ?`
        );
      }

      const { operator, attribute, value } = rule;

      switch (attribute) {
        case 'weight':
          return this.checkRule(orderData.totalWeight, operator, value);
        case 'country_code':
          return this.checkRule(orderData.countryCode, operator, value);
        case 'subtotal':
          return this.checkRule(orderData.subtotal, operator, value);
        default:
          return true; // Règle inconnue => on ignore
      }
    });
  });

  return validOptions;
}


/**
 * Vérifie une règle simple (poids, prix, pays)
 */
private checkRule(
  input: string | number,
  operator: string,
  value: any
): boolean {
  switch (operator) {
    case 'eq':
      return input === value;
    case 'ne':
      return input !== value;
    case 'gt':
      return input > value;
    case 'gte':
      return input >= value;
    case 'lt':
      return input < value;
    case 'lte':
      return input <= value;
    case 'in':
      return Array.isArray(value) && value.includes(input);
    case 'nin':
      return Array.isArray(value) && !value.includes(input);
    default:
      return true;
  }
}

/**
 * Calcule le prix d'une ShippingOption en fonction de son type
 */
async calculateShippingPrice(optionId: string, context: {
  totalWeight: number;
  subtotal: number;
}) {
  const option = await this.shippingOptionModel
    .findById(optionId)
    .populate('type')
    .exec();

  if (!option) {
    throw new Error('Shipping option not found');
  }

  if (option.price_type === 'flat') {
    // Exemple : prix fixe dans option.data.amount
    return option.data?.amount || 0;
  }

  if (option.price_type === 'calculated') {
    // Exemple : prix = base + (poids * facteur)
    const base = option.data?.base || 0;
    const perKg = option.data?.per_kg || 0;
    const price = base + (context.totalWeight * perKg);
    return price;
  }

  throw new Error('Unknown price type');
}

/**
 * Liste toutes les options d'un profil,
 * filtrées selon les règles et calcul des prix.
 */


  // ➜ GET Fulfillment Address (par Fulfillment ID)
async getFulfillmentAddress(fulfillmentId: string): Promise<FulfillmentAddress | null> {
  return this.fulfillmentAddressModel.findOne({ fulfillment: fulfillmentId }).exec();
}

// ➜ UPDATE Fulfillment Address
async updateFulfillmentAddress(
  fulfillmentId: string,
  addressId: string,
  dto: Partial<CreateFulfillmentAddressDto>
): Promise<FulfillmentAddress> {
  const address = await this.fulfillmentAddressModel.findOneAndUpdate(
    { _id: addressId, fulfillment: fulfillmentId },
    dto,
    { new: true }
  ).exec();

  if (!address) {
    throw new NotFoundException(`Address not found for this fulfillment`);
  }

  return address;
}

// ➜ DELETE Fulfillment Address
async deleteFulfillmentAddress(
  fulfillmentId: string,
  addressId: string,
  

): Promise<void> {
  const deleted = await this.fulfillmentAddressModel.findOneAndDelete({
    _id: addressId,
    fulfillment: fulfillmentId,
  }).exec();

  if (!deleted) {
    throw new NotFoundException(`Address not found for this fulfillment`);
  }
}


}
