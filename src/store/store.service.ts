import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Currency, CurrencyDocument } from 'src/currency/entities/currency.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Store, StoreDocument } from './entities/store.entity';
import mongoose, { Model } from 'mongoose';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateStoreWithUserDto } from './dto/create-store-with-user.dto';
import { Role } from 'src/auth/role.enum';
import { UserService } from 'src/user/user.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateCurrencyDto } from 'src/currency/dto/update-currency.dto';

@Injectable()
export class StoreService {

  constructor(
      @InjectModel(Currency.name) private readonly currencyModel: Model<CurrencyDocument>,
      @InjectModel(Store.name) private readonly storeModel: Model<StoreDocument>,
      @InjectModel(User.name) private userModel: Model<User>,
      private jwtService: JwtService,
  ) {}

async createStoreForExistingUser(dto: CreateStoreDto, ownerId: string) { 
  console.log(ownerId, 'ownerid')
  const user = await this.userModel.findById(ownerId);

  if (!user) {
    throw new NotFoundException("Utilisateur introuvable");
  }

  const store = await this.storeModel.create({
    ...dto,
    owner: user._id, // CORRECTION ici
    status: 'inactive', // ou StoreStatus.INACTIVE si tu utilises l’enum
    metadata: {},
  });

  return {
    message: "Boutique créée avec succès",
    store,
  };
}


  async findByUserId(userId: string): Promise<Store | null> {
    return this.storeModel.findOne({ user: userId }).exec();
  }


async findStoreByUserId(userId: string): Promise<Store | null> {
  return this.storeModel.findOne({ owner: userId }).exec();
}

async updateStore(id: string, dto: UpdateStoreDto) {
  return this.storeModel.findByIdAndUpdate(id, dto, { new: true });
}

  async getMyStores(userId: string) {
    return this.storeModel.find({ owner: userId });
  }



// store.service.ts
async findAll(params: any) {
  const { page = 1, limit = 10, q = "" } = params;

  const query = q
    ? { name: { $regex: q, $options: "i" } }
    : {};

  const [stores, count] = await Promise.all([
    this.storeModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('owner', 'email first_name last_name'), //  important
    this.storeModel.countDocuments(query),
  ]);

  return { stores, count };
}



async findOne(id: string, user?: any) {
  const storeId = id === 'me' ? user?.id ?? id : id;

  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    throw new BadRequestException('Invalid store ID');
  }

  return this.storeModel
    .findById(storeId)
    .populate('owner', 'email first_name last_name');
}


  
  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const updatedStore = await this.storeModel.findByIdAndUpdate(id, updateStoreDto, { new: true }).exec();
    if (!updatedStore) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return updatedStore;
  }

  async remove(id: string): Promise<Store> {
    const deletedStore = await this.storeModel.findByIdAndDelete(id).exec();
    if (!deletedStore) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return deletedStore;
  }

  //-------------------------------
  // CRUD CURRENCY
  // -------------------------------
  async createCurrency(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const createdCurrency = new this.currencyModel(createCurrencyDto);
    return createdCurrency.save();
  }

  async findAllCurrencies(): Promise<Currency[]> {
    return this.currencyModel.find().exec();
  }

  async findOneCurrency(id: string): Promise<Currency> {
    const currency = await this.currencyModel.findById(id).exec();
    if (!currency) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }
    return currency;
  }

  async updateCurrency(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<Currency> {
    const updatedCurrency = await this.currencyModel.findByIdAndUpdate(id, updateCurrencyDto, { new: true }).exec();
    if (!updatedCurrency) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }
    return updatedCurrency;
  }

  async removeCurrency(id: string): Promise<Currency> {
    const deletedCurrency = await this.currencyModel.findByIdAndDelete(id).exec();
    if (!deletedCurrency) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }
    return deletedCurrency;
  }

}
