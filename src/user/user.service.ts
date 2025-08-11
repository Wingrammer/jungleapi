import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/role.enum';
import { v4 as uuidv4 } from 'uuid';
import { AuthIdentity } from 'src/auth/entities/auth-identity.entity';
import { JwtService } from '@nestjs/jwt';
import { Store } from 'src/store/entities/store.entity';
import { Invite } from './entities/invite.entiy';


type UserDocument = HydratedDocument<User>;

@Injectable()
export class UserService {
  constructor(
        private readonly jwtService: JwtService,
    
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Invite.name) private readonly inviteModel: Model<Invite>,
    @InjectModel(Store.name) private readonly storeModel: Model<Invite>,

  ) {}

  /** Créer un nouvel utilisateur */
  async createUser(dto: CreateUserDto): Promise<User> {
  const roleToUse = dto.role ?? Role.CUSTOMER;

  const u = new this.userModel({
    ...dto,
    role: roleToUse,
    userId: uuidv4(), 
  });

  return u.save();

  }

  public generateTokens(user: any, identity: AuthIdentity) {
      // Ton code de génération de JWT ici
  
      const payload = {
        sub: user.id.toString(),
        auth_identity: identity.id.toString(),
        phone: user.phone,
        first_name: user.first_name,
        roles: [user.role],
      };
  
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      });
  
      const refreshPayload = {
        sub: user.id.toString(),
      };
  
      const refresh_token = this.jwtService.sign(refreshPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });
  
      return {
        access_token,
        refresh_token,
      };
    }
    

/** Cherche par userId au lieu de _id */
  async findOneByUserId(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec()//this.userModel.findOne({ id:userId }).exec();
  }

  async findByEmail(email: string) {
  return this.userModel.findOne({ email });
}



  /** Récupérer tous les utilisateurs */
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  /** Récupérer un utilisateur par ID */
  async findOneById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  /** Récupérer un utilisateur par nom d’utilisateur */
  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  /** Récupérer un utilisateur par numéro de téléphone */
  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone }).exec();
  }

  /** Mettre à jour un utilisateur */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  /** Supprimer un utilisateur */
  async remove(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  
  /** recuper tout le role de tout les utilisateur */
  async findAllByRole(role: Role): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  // user.service.ts

async checkUserHasStoreByEmailOrPhone(email?: string, phone?: string): Promise<boolean> {
  const query: any = {};
  if (email) query.email = email;
  if (phone) query.phone = phone;

  const user = await this.userModel.findOne(query);
  if (!user) return false;

  const store = await this.storeModel.findOne({ owner: user._id });
  return !!store;
}


  
}
