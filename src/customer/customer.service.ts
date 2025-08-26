import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './entities/customer.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { TokensDto } from 'src/auth/dto/tokens.dto';
import { Role } from 'src/auth/role.enum';
import { RegisterDto } from './dto/registerCustomer.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private readonly jwtService: JwtService, 
  ) {}


async register(registerDto: RegisterDto): Promise<{ access_token: string; refresh_token: string }> {
  const { phone, name } = registerDto;

  const existingUserByPhone = await this.findByPhone(phone);
  if (existingUserByPhone) {
    throw new BadRequestException('Un utilisateur avec ce téléphone existe déjà.');
  }

  const newUser = await this.createUser({
    phone,
    name
  });

  return this.generateTokens(newUser);
}


      
async createUser(dto: CreateCustomerDto): Promise<CustomerDocument> {
  const u = new this.customerModel({
    ...dto,
    role: Role.CUSTOMER.toString(), // forcé en string
    userId: uuidv4(),
  });

  return u.save();
}



// auth.service.ts
generateTokens(user: { id?: string; phone?: string; role?: Role }) {
  const payload = { sub: user.id, phone: user.phone, role: user.role };
  const accessToken = this.jwtService.sign(payload);
  const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
  return { access_token: accessToken, refresh_token: refreshToken };
}


  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }
 
  async findByPhone(phone: string): Promise<Customer | null> {
    return this.customerModel.findOne({ phone }).exec();
  }



  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
