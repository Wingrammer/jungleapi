// auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { RegisterDto } from './dto/Register.dto';
import { AuthIdentity, AuthIdentityDocument } from './entities/auth-identity.entity';
import { ProviderIdentity, ProviderIdentityDocument } from './entities/provider-identity.entity';
import { isValidObjectId, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateAuthIdentityDto } from './dto/update-auth-identity.dto';
import { UpdateProviderIdentityDto } from './dto/update-provide-identity.dto';
import { Role } from './role.enum';
import { MailService } from 'src/mail/mail.service';
import { VerificationCode } from './entities/verification-code.entity';
import { OtpService } from 'src/otp/otp.service';
import { TokensDto } from './dto/tokens.dto';
import { UpdateProviderDto } from './dto/update-provide.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,

    @InjectModel(AuthIdentity.name)
    private readonly authIdentityModel: Model<AuthIdentityDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(ProviderIdentity.name)private readonly providerIdentityModel: Model<ProviderIdentityDocument>,
    @InjectModel(VerificationCode.name) private readonly verificationCodeModel: Model<VerificationCode>,
    private mailService: MailService,
  ) {}

  // auth.service.ts
  private readonly refreshTokens: Map<string, string> = new Map();


  async register(registerDto: RegisterDto): Promise<{ access_token: string; refresh_token: string }> {
    const { phone, email, password, first_name, last_name } = registerDto;

    const existingUserByPhone = await this.userService.findByPhone(phone);
    if (existingUserByPhone) {
      throw new BadRequestException('Un utilisateur avec ce téléphone existe déjà.');
    }

    if (email) {
      // Vérifie aussi dans "users"
      const existingUserByEmail = await this.userService.findByEmail(email);
      if (existingUserByEmail) {
        throw new BadRequestException('Un utilisateur avec cet email existe déjà.');
      }

      const existingAuthIdentityByEmail = await this.authIdentityModel.findOne({ email });
      if (existingAuthIdentityByEmail) {
        throw new BadRequestException('Un utilisateur avec cet email existe déjà.');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.createUser({
      phone,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: Role.VENDOR,
    });

    // Génère un username unique : joyce.anato, joyce.anato1, etc.
    let baseUsername = `${first_name}.${last_name}`.toLowerCase().replace(/\s+/g, '');
    let username = baseUsername;
    let counter = 1;
    while (await this.authIdentityModel.findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    const authIdentity = new this.authIdentityModel({
      username,
      email,
      password: hashedPassword,
      phone,
      user: newUser._id,
    });

    try {
      await authIdentity.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.username) {
        throw new BadRequestException(
          "Un utilisateur avec ce nom et prénom existe déjà. Veuillez en choisir d'autres."
        );
      }
      throw error;
    }

    return this.generateTokens(newUser, authIdentity);
  }

      


  generateTokens(user: User, identity: AuthIdentity): TokensDto {
  const accessPayload = {
    sub: user._id,
    email: user.email,
    phone: user.phone,
    role: user.role,
    first_name: user.first_name,
  };

  const refreshPayload = {
    sub: user._id,
    identityId: identity.id,
  };

  return {
    access_token: this.jwtService.sign(accessPayload),
    refresh_token: this.jwtService.sign(refreshPayload, {
      expiresIn: '7d',
    }),
  };
 }

  async createIdentity(createIdentityDto: {
    user: Types.ObjectId;
    provider: string;
    credentials: any;
  }) {
    const identity = new this.authIdentityModel(createIdentityDto);
    return identity.save();
  }

   

  
 async signIn(
  login: string,
  password: string
): Promise<{
  access_token: string;
  refresh_token: string;
  role: string; //  utile côté frontend
}> {
  console.log(login)
  if (!login || typeof login !== 'string') {
    throw new UnauthorizedException('Login invalide');
  }

  let authIdentity;

  const isPhone = /^\+?\d+$/.test(login);

  if (isPhone) {
    authIdentity = await this.authIdentityModel.findOne({ phone: login });
  } else {
    const loginLower = login.toLowerCase();
    authIdentity = await this.authIdentityModel.findOne({
      $or: [{ username: loginLower }, { email: loginLower }],
    });
  }

  if (!authIdentity) {
    throw new UnauthorizedException('Identité non trouvée creer un compte.');
  }

  const isPasswordValid = await bcrypt.compare(password, authIdentity.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Mot de passe incorrect.');
  }

  const user = await this.userService.findOneById(authIdentity.user.toString());
  if (!user) {
    throw new UnauthorizedException('Utilisateur introuvable.');
  }
 
  //  Si l'utilisateur est un admin "forcé"
  if (authIdentity.email === 'anatojoyce3@gmail.com') {
    user.role = 'admin'; //  on force ici le rôle
  }

  const tokens = this.generateTokens(user, authIdentity);

  return {
    ...tokens,
    role: user.role ?? 'user', //  retourne le rôle pour le frontend
  };
}


  async verifyPhoneOtp(phone: string, otp: string): Promise<{ access_token: string; refresh_token: string }> {
    const isOtpValid = await this.otpService.verify(phone, otp);
    if (!isOtpValid) {
      throw new UnauthorizedException('OTP invalide ou expiré');
    }

    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const authIdentity = await this.authIdentityModel.findOne({ phone });
    if (!authIdentity) {
      throw new UnauthorizedException('Identité non trouvée');
    }

    return this.generateTokens(user, authIdentity);
  }

  async refresh(refresh_token: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userService.findOneById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Utilisateur introuvable.');
      }

      const authIdentity = await this.authIdentityModel.findOne({ user: user._id });
      if (!authIdentity) {
        throw new UnauthorizedException('Identité non trouvée.');
      }

      const newAccessToken = this.jwtService.sign(
        {
          sub: user.id.toString(),
          auth_identity: authIdentity.id.toString(),
          phone: user.phone,
          first_name: user.first_name,
          roles: [user.role],
        },
        {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET,
        },
      );

      return { access_token: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Refresh token invalide ou expiré.');
    }
  }

  async findOne(id: string): Promise<AuthIdentity | null> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID invalide');
    }
    return this.authIdentityModel.findById(id).populate('providerIdentities').exec();
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<AuthIdentity | null> {
    return this.authIdentityModel
      .findByIdAndUpdate(id, updateAuthDto, { new: true })
      .populate('providerIdentities')
      .exec();
  }

  async remove(id: string): Promise<{ deleted: boolean; message: string }> {
    const result = await this.authIdentityModel.findByIdAndDelete(id).exec();
    if (result) {
      return { deleted: true, message: `AuthIdentity ${id} supprimée.` };
    } else {
      return { deleted: false, message: `AuthIdentity ${id} non trouvée.` };
    }
  }

  async findUser(id:string){
    return await this.userModel.findById(id).select('-password').exec();
  }

   async findOrCreateUser(profile: {
    email: string;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    // 1. Vérifie si l'utilisateur existe déjà
    let user = await this.userModel.findOne({ email: profile.email }).exec();

    // 2. Crée l'utilisateur s'il n'existe pas
    if (!user) {
      user = new this.userModel({
        email: profile.email,
        first_name: profile.firstName || 'Utilisateur',
        last_name: profile.lastName || 'Google',
        is_active: true,
      });
      await user.save();
    }

    return user;
  }

  

  // Supprimer des identités de provider
  async deleteProviderIdentities(ids: string[]) {
    // Supprimer des identités de provider
  }

  async listAuthIdentities(userId: string) {
    // Lister les identités d’un utilisateur
  }

  async listAndCountAuthIdentities() {
    // Lister avec pagination ou count
  }

  async listProviderIdentities(userId: string) {
    // Lister identités de provider
  }

  async retrieveAuthIdentity(id: string) {
    // Récupérer une identité par ID
  }

  async retrieveProviderIdentity(id: string) {
    // Récupérer une identité de provider
  }

  async updateAuthIdentities(data: UpdateAuthIdentityDto[]) {
    // Mettre à jour
  }

  async updateProviderIdentities(data: UpdateProviderIdentityDto[]) {
    // Mettre à jour
  }

  async updateProvider(data: UpdateProviderDto) {
    // Mettre à jour un provider (config ou metadata)
  }

  async validateCallback(token: string) {
    // Valider un retour d’auth externe
  }

   async validateUser(username: string, pass: string): Promise<any> {
    console.log(username, pass)
    const user = await this.userService.findByEmail(username);
    

    if(!user){
      throw new BadRequestException('utilisateur indéfini');
    }
    
    console.log(user, 'userval')
    const isPasswordValid = await bcrypt.compare(pass, user?.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    console.log(user, 'authser log')
    const payload = { username: user.email, sub: user._id.toString() };
    console.log(payload, 'payload')
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async loginUser(user: any): Promise<{ access_token: string }> {
  console.log(user, 'authser log');
  
  // Validation de l'email et de l'id utilisateur
  if (!user || !user.email || typeof user.email !== 'string') {
    throw new UnauthorizedException('Identifiants invalides');
  }
  
  if (!user._id) {
    throw new UnauthorizedException('Utilisateur introuvable');
  }

  const authIdentity = await this.authIdentityModel.findOne({ email: user.email });
  
  if (!authIdentity) {
    throw new UnauthorizedException('Identité non trouvée');
  }

  // Si l'utilisateur a un mot de passe hashé
  const isPasswordValid = await bcrypt.compare(user.password, authIdentity.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Mot de passe incorrect');
  }

  const payload = { username: user.email, sub: user._id.toString() };
  console.log(payload, 'payload');

  // Si l'utilisateur est un admin "forcé" ou a un rôle spécifique
  const userInfo = await this.userService.findOneById(authIdentity.user.toString());
  if (userInfo?.role === 'admin') {
    payload['role'] = 'admin'; // Ajoute le rôle dans le payload si nécessaire
  }

  // Génére le JWT pour l'utilisateur
  const access_token = this.jwtService.sign(payload);
  
  return { access_token };
}






}