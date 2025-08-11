import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity'; 
import { JwtModule } from '@nestjs/jwt';
import { Store, StoreSchema } from 'src/store/entities/store.entity';
import { StoreCurrencySchema } from 'src/store/entities/currency.entity';
import { AuthIdentity, AuthIdentitySchema } from 'src/auth/entities/auth-identity.entity';
import { Invite, InviteSchema } from './entities/invite.entiy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', //  à sécuriser avec .env
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Invite.name, schema: InviteSchema },
      { name: Store.name, schema: StoreSchema },
      { name: AuthIdentity.name, schema: AuthIdentitySchema },
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
