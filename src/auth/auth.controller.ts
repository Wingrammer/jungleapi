import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RegisterDto } from './dto/Register.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guards';
import { RequestCodeDto } from './dto/request-code.dto';
import { OtpService } from 'src/otp/otp.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
     private readonly otpService: OtpService,
  ) {}


  
  /** REGISTER */
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /** LOGIN PAR PHONE + PASSWORD */
  @Post('login')
  async signIn(@Body() signInDto: { login: string; password: string }) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

    /** REFRESH TOKEN */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refresh_token?: string }) {
    if (!body?.refresh_token) {
      throw new BadRequestException('Le refresh_token est requis');
    }
    return this.authService.refresh(body.refresh_token);
  }

 
  /** PROFILE */
  @Get('profile')
  @Roles(Role.VENDOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    console.log(userId, "userId")
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      return { message: 'Utilisateur non trouvé' };
    }

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deleted_at,
    };
  }

  /** OTP: Vérification */
 
  
  @Post('request-otp')
  async requestOtp(@Body() body: { email: string }) {
    console.log('Body reçu:', body);
    if (!body.email) {
      throw new BadRequestException('Email requis.');
    }

    await this.otpService.generate(body.email);
    return { message: 'Code envoyé à votre adresse email.' };
  }
  
    @Post('verify-otp')
    async verifyOtp(@Body() body: { email: string; code: string }) {
      const isValid = await this.otpService.verify(body.email, body.code);

      if (!isValid) {
        throw new BadRequestException('Code incorrect ou expiré.');
      }

      return { message: 'Code vérifié avec succès.' };
    }

 

  /** CRUD AuthIdentity */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  /** DASHBOARDS protégés par rôle */
  @Get('vendor-dashboard')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.VENDOR)
  getVendorDashboard(@Request() req) {
    return {
      message: `Hello Vendor ${req.user.first_name} !`,
      user: req.user,
    };
  }

  @Get('admin-dashboard')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  getAdminDashboard(@Request() req) {
    return {
      message: `Hello Admin ${req.user.first_name} !`,
      user: req.user,
    };
  }
}
